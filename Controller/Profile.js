
const Profile = require('../Model/Profile')
const Message = require('../Model/Message')

// 1. Update user : not
// 2. Delete user
// 3. get messages

module.exports.get_user_data = async (req, res) => {
    let user = req.locals;
    let to_send = {
        username: user.username,
        email: user.email,
        date_of_creation: user.date_of_creation,
        total_message: await Message.find({username: user.username}).countDocuments()
    }
    res.send(to_send)
}

module.exports.delete_everyting = async (req, res) => {
    let user = req.locals
    await Profile.deleteOne({username: user.username});
    await Message.deleteMany({username: user.username});
    res.send()
}

module.exports.get_message = async (req, res) => {
    let user = req.locals 
    let page = req.params.page
    page = page? parseInt(page) : 1;
    if(page < 1) page = 1;

    let msg = Message.paginate({}, { page: page, limit: 3 }, function(err, result) {
        res.send(result.docs)
    });

}