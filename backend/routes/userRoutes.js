const express = require("express");
const router = express.Router();

const UserControllers = require("../controllers/UserControllers");
router.get("/", (req, res) => {
  res.send("Hello NODE API");
});
router.get("/users", UserControllers.getAllUsers);
router.post("/users", UserControllers.createUser);
router.get("/users/:id", UserControllers.getUserById);
router.delete("/users/:id", UserControllers.deleteUserById);
module.exports = router;
