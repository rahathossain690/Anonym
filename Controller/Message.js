
const Message = require('../Model/Message')
const Profile = require('../Model/Profile')
const message_validate = require('../Validation/message')

// sends message

module.exports = async (req, res) => {
    /* expects {body} 
    check validity
    push to dbase*/
    let data = req.body
    data.username = req.params.username
    const invalid = message_validate(data);
    if(invalid){
        res.status(403).send({invalid: invalid})
        return
    }
    let profile = await Profile.findOne({username: data.username});
    if(!profile){ // username doesnt exist
        res.status(404).send()
        return 
    }
    let message = new Message(data)
    await message.save()
    res.send()
}