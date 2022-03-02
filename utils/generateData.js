const { faker } = require("@faker-js/faker");
const fs = require("fs");

const precision = 1000; // 3 decimals
const users = [];
const leaderboard = [];


for(let i=0; i<1000000; i++){
    const name = faker.name.findName();
    const id = faker.internet.userName(name);
    const user = {
        id: id,
        name: name,
    }
    users.push(user);
}
console.log("user generated!!");

for(let i=0; i<1000000; i++){
    const points = Math.floor(Math.random() * (1000 * precision - 1 * precision) + 1 * precision) / (1*precision);
    const id = i+1;
    const user = {
        id: id,
        userId: users[i].id,
        points: points,
    }
    leaderboard.push(user);
}
console.log("leaderboard generated!!");


fs.writeFile("users.json", JSON.stringify(users), (err) => {
    if(!err){
        console.log("done");
    } else {
        console.log("err", err);
    }
})

fs.writeFile("leaderboards.json", JSON.stringify(leaderboard), (err) => {
    if(!err){
        console.log("done");
    } else {
        console.log("err", err);
    }
})