const db = require("../models/index");

const seedData = async () => {
    // User 삭제
    try{
        await db.User.destroy({
            where: {
                user_id: "iidd0101"
            }
        })
    }catch {
        console.log("asd");
    }
    // User 생성
    const user = await db.User.create({
        user_id: "iidd0101",
        password: "123123",
        email: "aa@a.com"
    });

    // User 조회
    const user1 = await db.User.findOne({
        where: {
            user_id: "iidd0101"
        },
        include: db.Post
    });

    const samplePost = db.post.build({
        content: "content",
        background: "1"
    })

    user1.Posts.push(samplePost);

    user1.save();
}
seedData();