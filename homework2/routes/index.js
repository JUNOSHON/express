import {MongoClient, ObjectId} from "mongodb";

export async function getConnection() {
  const databaseUrl = "mongodb://junoshon:thswnsgh0317@127.0.0.1/admin";
  const client = await MongoClient.connect(databaseUrl);
  const database = client.db("addressBook");
  return database.collection("addressBook");
}

export async function createInfo(Info) {
  const addressBook = await getConnection();
  return await addressBook.insertOne(Info);
}

// 3. Read

export async function findAll() {
  const addressBook = await getConnection();
  return await addressBook.find({}).toArray();
}


export async function findById(userId) {
  const findUser = await getConnection();
  console.log(userId);
  const objectId = new ObjectId(userId);
  return await findUser.findOne({"_id": objectId});
}
export async function findByUserName(userName) {
  const findUser = await getConnection();
  console.log(userName);
  const user = new String(userName);
  return await findUser.find({"username": `${user}`});
}

/*

// 4. Update
export async function updateById(userId, nickName) {
const connection = await getConnection();
const objectId = new ObjectId(userId);
return await connection.updateOne({"_id": objectId}, {$set: {"nickName": nickName}});
}

// 5. Delete
export async function deleteById(userId) {
let connection = await getConnection();
const objectId = new ObjectId(userId);
await connection.deleteOne({"_id": objectId});
}

*/
