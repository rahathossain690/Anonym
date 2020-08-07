const Profile = require('../Model/Profile')
const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
    try{
        var session = req.cookies.anonym_session;
        const elem = jwt.verify(session, process.env.SESSION_SECRET);
        const result = await Profile.findOne({_id: elem.uid});
        req.locals = result;
        if(!result || !result.is_active) {
            throw Error('profile not found')
        }
    } catch(error){
        res.status(401).send() // unauthorized
        return; 
    }
    next();
}