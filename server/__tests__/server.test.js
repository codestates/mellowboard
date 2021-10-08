const app = require('../index');
const request = require('supertest');
const https = require('https');
const agent = request(app);

const factoryService = require('./helper/FactoryService');
const databaseConnector = require('../lib/databaseConnector');
const DB_CONNECTOR = new databaseConnector();
const { expect, assert } = require('chai');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

describe('Section 3 Hiring Assessments', () => {
  before(async () => {
    await factoryService.init();
  });

  describe('\nℹ️  데이터베이스 연결\n====================\n', () => {
    after(async () => {
      await DB_CONNECTOR.terminate();
    });

    it('🧩 데이터베이스에 연결해야 합니다.', async () => {
      let response;

      console.log('DB 설정');
      console.table(DB_CONNECTOR.config);

      try {
        response = await DB_CONNECTOR.init();
      } catch (e) {
        console.log(e);
      }

      assert.strictEqual(response, 'ok');
    });

    it('🧩 데이터베이스에 `users` 테이블이 존재해야 합니다.', async () => {
      await DB_CONNECTOR.init();

      try {
        await DB_CONNECTOR.query('DESCRIBE users');
      } catch (error) {
        throw error;
      }
    });
  });

  describe('\nℹ️  서버 구현\n============\n', () => {
    before(async () => {
      await DB_CONNECTOR.init();
      await factoryService.setup();
      await factoryService.insertTestUser();
    });

    after(async () => {
      await DB_CONNECTOR.terminate();
    });

    describe('🚩 Protocol - HTTP over Secure', () => {
      it('HTTPS 프로토콜을 사용하는 서버여야 합니다.', () => {
        expect(app instanceof https.Server).to.equal(true);
      });
    });

    describe('🚩 POST /signin', () => {
      let cookies = '';
      it("🧩 로그인 요청시 전달받은 유저아이디, 비밀번호가 데이터베이스에 저장된 정보와 완벽히 일치하는 경우, 'ok' 메세지와 상태코드 200이 응답에 포함되어야 합니다", async () => {
        const response = await agent.post('/signin').send({
          email: 'hoyong@codestates.com',
          password: 'password'
        });

        cookies = response.header['set-cookie'][0];
        expect(response.status).to.eql(200);
        expect(response.body.message).to.eql('ok');
      });

      it("🧩 로그인 요청시 전달받은 유저 아이디 혹은 비밀번호가 잘못된 경우, 'invalid user' 메세지와 상태코드 404가 응답에 포함되어야 합니다", async () => {
        const response = await agent.post('/signin').send({
          email: 'coding.kim@javascript.com',
          password: 'helloWorld'
        });

        expect(response.status).to.eql(404);
        expect(response.text).to.eql('invalid user');
      });

      it('🧩 로그인 성공시 쿠키로 JWT 토큰을 전달해야 합니다.', () => {
        expect(cookies).include('jwt');
      });
    });

    describe('🚩 POST /signup', () => {
      let cookies;

      it('🧩 회원가입 요청이 성공하면 상태코드 201와 JWT 토큰이 응답에 포함되어야 합니다', async () => {
        const response = await agent.post('/signup').send({
          email: 'testuser@gmail.com',
          password: 'test',
          username: 'testuser',
          mobile: '010-0987-6543'
        });
        cookies = response.header['set-cookie'][0];
        expect(response.status).to.eql(201);
        expect(cookies).include('jwt');
        expect(response.body).to.eql({ message: 'ok' });
      });

      it('🧩 해당 유저 email이 이미 데이터베이스에 존재한다면 409(conflict) 상태코드로 응답을 돌려줘야 합니다.', async () => {
        const response = await agent.post('/signup').send({
          username: 'hoyong',
          email: 'hoyong@codestates.com',
          password: 'password',
          mobile: '010-1234-5678'
        });
        expect(response.status).to.eql(409);
        expect(response.text).to.eql('email exists');
      });

      it('🧩 username, email, password, mobile 파라미터 중 하나라도 요청에서 제공되지 않았다면 422(unprocessable entity) 상태코드로 응답을 돌려줘야 합니다.', async () => {
        const fakeUser = {
          username: 'hoyong',
          email: 'hoyong@codestates.com',
          password: 'password',
          mobile: '010-1234-5678'
        };

        async function multipleSignupRequest(user) {
          const keyList = Object.keys(user);
          const result = [];

          for (let i = 0; i < keyList.length; i++) {
            const oneParameterMissingUser = {};
            keyList
              .filter((key) => key !== keyList[i])
              .forEach((key) => (oneParameterMissingUser[key] = user[key]));
            const response = await agent
              .post('/signup')
              .send(oneParameterMissingUser);
            result.push(response);
          }
          return result;
        }

        const fakeUserAttempts = await multipleSignupRequest(fakeUser);

        fakeUserAttempts.forEach((attempt) => {
          expect(attempt.status).to.eql(422);
          expect(attempt.text).to.eql('insufficient parameters supplied');
        });
      });
    });

    describe('🚩 POST /signout', () => {
      it('🧩 로그아웃 요청시 205 상태코드로 응답해야 합니다.', async () => {
        const response = await agent.post('/signout');
        expect(response.status).to.eql(205);
        expect(response.text).to.eql('Logged out successfully');
      });
    });

    describe('🚩 GET /auth', () => {
      let resCookie = '';
      beforeEach((done) => {
        agent
          .post('/signin')
          .send({
            email: 'hoyong@codestates.com',
            password: 'password'
          })
          .then((res) => {
            resCookie = res.headers['set-cookie'][0];
            done();
          })
          .catch(() => {
            done();
          });
      });
      it('🧩 쿠키에 jwt 토큰이 존재하며 토큰에 유저정보가 담겨져 있는경우, 해당 유저의 정보를 리턴해야 합니다 ', (done) => {
        agent
          .get('/auth')
          .set('Cookie', resCookie)
          .end(function (err, res2) {
            expect(resCookie).include('jwt');
            expect(res2.status).to.eql(200);
            expect(res2.body.data).to.have.keys('userInfo');
            expect(res2.body.data.userInfo).to.not.have.keys('password');
            done();
          });
      });

      it("🧩 쿠키에 JWT이 없는 요청 혹은 잘못된 토큰을 전달받은 경우, 응답에는 'not authorized' 메세지가 포함되어야 합니다", async () => {
        const response = await agent.get('/auth');

        expect(response.body.data).to.eql(null);
        expect(response.body.message).to.eql('not authorized');
      });
    });
  });
  after(async () => {
    await factoryService.terminate();
  });
});
