


const UserTweets = require('../models/userTweets');
const UserFollowers = require('../models/userFollowers');

exports.fetchAllFollowers = async (req, res, next) => {
    const followers = await UserFollowers.findOne({"UserName":"arun"}).populate('Followers');
    res.status(200).json(followers.Followers);
};



exports.fetchAll = async (req, res, next) => {
    const tweets = await UserTweets.find();
    res.status(200).json(tweets);
};


exports.save = async (req, res, next)  => {
    const { UserName, Tweet } = req.body;
  
    const newUserTweet = new UserTweets({
      UserName,
      Tweet
    });
  
    newUserTweet.save()
      .then(savedUserTweet => {
        console.log('Saved user tweet:', savedUserTweet);
        res.status(201).json(savedUserTweet);
      })
      .catch(error => {
        console.error('Error saving user tweet:', error);
        res.status(500).json({ error: 'Failed to save user tweet' });
      });
  };

 exports.getById =(req, res) => {
    const { username } = req.params;
  
    UserTweets.find({ UserName: username })
      .then(tweets => {
        console.log('Found tweets:', tweets);
        res.status(200).json(tweets);
      })
      .catch(error => {
        console.error('Error finding tweets:', error);
        res.status(500).json({ error: 'Failed to retrieve tweets' });
      });
  };

  exports.getTweetsByFollower= async (req, res) => {
    try {
        console.log('abcd');
      const { username } = req.params;
      console.log(username);
      console.log('gfgfg');
      // Find followers of the user


    //   const followers = await UserFollowers.findOne({"UserName":"arun"});
    // res.status(200).json(followers.Followers);
      const userFollowers = await UserFollowers.findOne({ UserName: username });//.populate('Followers');

          console.log('---')
          console.log(userFollowers)
          console.log('---')

      if (!userFollowers) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Retrieve tweets of each follower
      const followersWithTweets = await Promise.all(userFollowers.Followers.map(async follower => {
        const tweets = await UserTweets.find({ UserName: follower._id });
        return {
          follower: follower.UserName,
          tweets: tweets
        };
      }));
  
      res.status(200).json(followersWithTweets);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error hfgdfg' });
    }
  };
  