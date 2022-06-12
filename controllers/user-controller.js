const { User, Thought } = require("../models");

const userController = {

  getAllUsers(req, res) {
    User.find({})
      .populate("friends thoughts")
      .select("-__v")
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.json(err));
  },

  addUser({ body }, res) {
    User.create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.json(err));
  },


  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: "thoughts friends",
        select: "-__v",
      })
      .select("-__v")
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user was found with this id" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },


  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user was found with this id" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },

 
  deleteUser({ params }, res) {
    User.findOneAndDelete(
      { _id: params.id }

    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user was found with this id" });
          return;
        }
        console.log(dbUserData);
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },

  addUserFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $addToSet: { friends: params.friendId } },
      { new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user was found with this id" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },


  deleteUserFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user was found with this id" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },
};

module.exports = userController;