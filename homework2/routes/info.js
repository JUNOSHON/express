import express from "express";
import {
  createInfo,
  findAll,
  findById,
  findByUserName
  /*
  updateById,
  deleteById,
  \,*/
} from "./index.js";
import {StatusCodes} from "http-status-codes";

const router = express.Router();

router.route("/api/users")
  .get(async (req, res) => {
    const users = await findAll();
    console.log(users);
    res.status(StatusCodes.OK)
      .send(`result: ${JSON.stringify(users)}`);
  })
  
  .post(async (req, res) => {
    if (req.body["username"] && req.body["address"] && req.body["phonenumber"] && req.body["email"]) {
      const newUser = await createInfo(req.body);
      res.status(StatusCodes.CREATED)
        .send(newUser);
    } else {
      console.log(req.body);
      console.log("Create Failed");
    }
  });


router.route("/api/users/:userId")
  .get(async (req, res) => {
    console.log(`${req.params.userId}`);
    const user = await findById(req.params.userId);
    console.log(`result: ${JSON.stringify(user)}`);
    res.status(StatusCodes.OK)
      .send(user);
  });

//username 으로 조회
router.route("/api/users/:username")
  .get(async (req, res) => {
    console.log(`${req.params.username}`);
    const user = await findByUserName(req.params.username);
    console.log(`result: ${JSON.stringify(user)}`);
    res.status(StatusCodes.OK)
      .send(user);
  });
  /*
  .delete(async (req, res) => {
    console.log(`${req.params.userId}`);
    const deleteUser = await deleteById(req.params.userId);
    console.log(`result: ${JSON.stringify(deleteUser)}`);
    console.log("deleted success");
    res.status(StatusCodes.OK)
      .send(deleteUser);
  })
  
  .patch(async (req, res) => {
    console.log(`${JSON.stringify(req.body)}`);
    console.log();
    const findUser = await findById(req.params.userId);
    if ((findUser.email === req.body.email) && (findUser.password === req.body.password)) {
      console.log(req.params.userId);
      const result = await updateById(req.params.userId, req.body.nickName);
      res.status(StatusCodes.OK)
        .send(result);
    } else {
      console.log("sorry, I can't update");
    }
    
  });*/
export default router;