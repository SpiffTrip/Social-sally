const router = require("express").Router();

const {
  getAllUsers,
  addUser,
  getUserById,
  updateUser,
  deleteUser,
  addUserFriend,
  deleteUserFriend,
} = require("../../controllers/user-controller");


router.route("/").get(getAllUsers).post(addUser);

router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);


router
  .route("/:userId/friends/:friendId")
  .put(addUserFriend)
  .delete(deleteUserFriend);

module.exports = router;