const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserFollowerSchema = new Schema({
    

    UserName: String,
    Followers: [{type: Schema.Types.ObjectId, ref: 'user'}]
});



//Product => product + 's' => products
module.exports = mongoose.model('UserFollower', UserFollowerSchema);