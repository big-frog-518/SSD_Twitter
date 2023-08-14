const express = require('express');
const userFollower = require('../controllers/userFollowerController');


const router = express.Router();



router.get('/users', userFollower.fetchUsers);
router.get('/', userFollower.fetchAll);


// To follow user
router.post('/addUserFollower',userFollower.save); 

router.put('/removeFollower/:username',userFollower.removeFollower);
router.put('/addFollower/:username',userFollower.addFollower);






module.exports = router;