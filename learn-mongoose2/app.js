import dotenv from "dotenv";
import express, {response} from "express";
import http from "http";
import path from "path";
import serveStatic from "serve-static";
import expressSession from "express-session";
import {MongoClient} from "mongodb";

dotenv.config();

const databaseUrl = "mongodb://junoshon:thswnsgh0317@localhost:27017/admin"
const client = await MongoClient.connect(databaseUrl);
const database = client.db("nodejs2");
const collection = database.collection("users");

/*

async function connectDB() {
  
  const databaseUrl = "mongodb://junoshon:thswnsgh0317@localhost:27017/admin"
  const client = await MongoClient.connect(databaseUrl);
  const database = client.db("nodejs2");
  const collection = database.collection("users");
  
  console.log("익스프레스와 몽고디비 연결완료");
  
  return collection;
  
  */

const newUser = {
    name: "손준호",
    email: "juno@naver.com",
};


/*
async function createUsers(){
  
  await collection.insertOne(newUser);
  let user = collection.find();
  console.log(`유저 목록 => ${JSON.stringify(await user.toArray())}`);
}

async function readUsers(){
  let findUser= await collection.findOne({"name" : "손준호"});
  console.log(`찾는 사람 => ${JSON.stringify(findUser)}`);
}
*/

/*async function deleteUsers(){
  
  
  const deleteUsers = await collection.deleteOne({"name" : "손준호"});
  console.log(`지운 사람 =>  ${JSON.stringify(await deleteUsers())}`);
  
}*/
async function updateUsers(){
  let updateUser = await collection.findOne({"name" : "손준호"});
  await collection.updateOne({"name" : "손준호"}, {$set: {"name" : "주노손"}})
  console.log(`이름 변경 => ${JSON.stringify(updateUser)}`);
}
  
  //console.log(`users => ${JSON.stringify(await user.toArray())}`);
  
/*  await collection.insertOne(newUser);
  let user = collection.find();
  console.log(`users => ${JSON.stringify(await user.toArray())}`);*/
  
  //user = collection.find();
  //console.log(`users => ${JSON.stringify(await user.toArray())}`);
  
  //const findUser = await collection.findOne({"name":"nero"});
  //console.log(`findUser => ${JSON.stringify(await findUser)}`);
  
  //const deleteUser = await collection.deleteOne({"name":"nero"});
  //console.log(`deleteUser => ${JSON.stringify(await deleteUser)}`);
  
  //user = collection.find();
  //console.log(`users => ${JSON.stringify(await user.toArray())}`);


const app = express();
const __dirname = path.resolve();

app.set("port", process.env.PORT || 13000);
app.use(express.urlencoded({extended: false}));
app.use("/public", serveStatic(path.join(__dirname, "public")));
app.use(expressSession({
  secret: "my key",
  resave: true,
  saveUninitialized: true,
}));


http.createServer(app).listen(app.get("port"), function () {
  
  
  /*createUsers();
  readUsers();*/
  // deleteUsers();
  updateUsers();
  
  
});