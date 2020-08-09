
const Profile = require('../Model/Profile')
const Message = require('../Model/Message');
const { use } = require('../api');

// 1. Update user : not
// 2. Delete user
// 3. get messages

module.exports.get_user_data = async (req, res) => {
    let user = req.locals;
    let to_send = {
        username: user.username,
        email: user.email,
        date_of_creation: user.date_of_creation,
        total_message: await Message.find({username: user.username}).countDocuments(),
        is_active: user.is_active
    }
    res.send(to_send)
}

module.exports.delete_everyting = async (req, res) => {
    let user = req.locals
    await Profile.deleteOne({username: user.username});
    await Message.deleteMany({username: user.username});
    res.send({ok: "ok"})
}

module.exports.get_message = async (req, res) => {
    let user = req.locals 
    let page = req.params.page
    page = page? parseInt(page) : 1;
    if(page < 1) page = 1;
    let msg = Message.paginate({username: user.username}, { page: page, limit: 3 }, function(err, result) {
        res.send(result.docs)
    });

}

module.exports.exists = async (req, res) => {
    let username = req.params.username;
    if(username == null) {
        res.send({exists: false});
        return;
    }
    let profile = await Profile.findOne({username : username});
    if(profile && profile.is_active) {
        res.send({exists: true});
        return;
    }
    res.send({exists: false});
}

module.exports.toggle_activation = async (req, res) => {
    let user = req.locals;
    await Profile.updateOne({username: user.username}, {$set: {is_active: !user.is_active}})
    res.send({ok: "ok"})
}