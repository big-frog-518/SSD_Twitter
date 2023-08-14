const Users = require('../models/user');
const UserFollowers = require('../models/userFollowers');

exports.fetchUsers = async (req, res, next) => {
    const users = await Users.find();
    res.status(200).json(users);
};


exports.fetchAll = async (req, res, next) => {
    const followers = await UserFollowers.find();
    res.status(200).json(followers);
};

exports.save = async (req, res, next) => {
    const { UserName, Followers } = req.body;
  
    const newUserFollower = new UserFollowers({
      UserName,
      Followers
    });
  
    newUserFollower.save()
      .then(savedUserFollower => {
        console.log('Saved user follower:', savedUserFollower);
        res.status(201).json(savedUserFollower);
      })
      .catch(error => {
        console.error('Error saving user follower:', error);
        res.status(500).json({ error: 'Failed to save user follower' });
      });
  };


  exports.removeFollower= async (req, res, next) => {
    const { username } = req.params;
    const { followerId } = req.body;
  
    UserFollowers.findOneAndUpdate(
      { UserName: username },
      { $pull: { Followers: followerId } },
      { new: true }
    )
      .then(updatedUserFollower => {
        if (updatedUserFollower) {
          console.log('Updated user follower:', updatedUserFollower);
          res.status(200).json(updatedUserFollower);
        } else {
          res.status(404).json({ error: 'User follower not found' });
        }
      })
      .catch(error => {
        console.error('Error updating user follower:', error);
        res.status(500).json({ error: 'Failed to update user follower' });
      });
  };


  exports.addFollower= async (req, res, next) =>  {
    const { username } = req.params;
    const { followerId } = req.body;
  
    UserFollowers.findOneAndUpdate(
      { UserName: username },
      { $addToSet: { Followers: followerId } }, // Use $addToSet to ensure unique values
      { new: true }
    )
      .then(updatedUserFollower => {
        if (updatedUserFollower) {
          console.log('Updated user follower:', updatedUserFollower);
          res.status(200).json(updatedUserFollower);
        } else {
          res.status(404).json({ error: 'User follower not found' });
        }
      })
      .catch(error => {
        console.error('Error updating user follower:', error);
        res.status(500).json({ error: 'Failed to update user follower' });
      });
  };

