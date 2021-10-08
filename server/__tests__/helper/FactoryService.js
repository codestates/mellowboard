const fs = require('fs');
const DatabaseConnector = require('../../lib/common/mysql');

const { Users } = require('../fixtures/model');

class FactoryService extends DatabaseConnector {
  constructor () {
    super();
    this.testUser = {
      username: '\'test\'',
      email: '\'test@test.com\'',
      password: '\'password\'',
      createdAt: '\'2020-10-10 10:00:12\'',
      updatedAt: '\'2020-10-10 10:00:12\''
    };
  }

  async create (model) {
    const table = model.constructor.name.toLowerCase();

    for (const col in model) {
      if (typeof model[col] === 'object') {
        const newCol = col + 'Id';
        model[newCol] = model[col];
        delete model[col];
      }
    }

    const column = Object.keys(model).join(',');
    const values = Object.values(model)
      .map((val) => (typeof val === 'object' ? val.id : val))
      .join(',');

    // HINT console.log below query when you want to know what happen in test
    // console.log(values);
    return await this.query(
      `INSERT INTO ${table} (${column}) VALUES (${values})`
    );
  }

  async find ({ table, column }) {
    return await this.query(`SELECT ${table}.${column} FROM ${table}`);
  }

  async setup () {
    await this.query(`USE ${this.config.database}`);
    await this.query('TRUNCATE TABLE users');
  }

  async tearDown () {
    await this.query(`DROP DATABASE IF EXISTS ${this.config.database}`);
    await this.query(`CREATE DATABASE ${this.config.database}`);
    await this.query(`USE ${this.config.database}`);
  }

  async insertTestUser () {
    await factoryService.create(new Users(this.testUser));
  }

  async deleteTestUser ({ email }) {
    await this.query(`DELETE FROM users WHERE email=${email}`);
  }
}

const factoryService = new FactoryService();

module.exports = factoryService;
