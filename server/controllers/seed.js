const dotenv = require("dotenv");
dotenv.config({path: ".env.dev"});


const db = require("../models");


const seedData = async () => {
    // User 삭제
    try{
        await db.User.destroy({
            where: {
                account: "iidd0101"
            }
        })
    }catch(err) {
        console.log("err");
        console.log(err);
    }

    // return 


    // User 생성
    const user = await db.User.create({
        account: "iidd0101",
        password: "123123",
        email: "aa@a.com"
    });

    // User 조회
    const user1 = await db.User.findOne({
        where: {
            account: "iidd0101"
        },
        include: db.Post
    });

    db.Post.create({
        content: "content",
        userId: user1.id,
        background: "1"
    })
    db.Post.create({
        content: "content",
        userId: user1.id,
        background: "1"
    })
    db.Post.create({
        content: "content",
        userId: user1.id,
        background: "1"
    })
    db.Post.create({
        content: "content",
        userId: user1.id,
        background: "1"
    })
    db.Post.create({
        content: "content",
        userId: user1.id,
        background: "1"
    })
    db.Post.create({
        content: "content",
        userId: user1.id,
        background: "1"
    })


    // user1.Posts.push(samplePost);

    // user1.save();
}
seedData();