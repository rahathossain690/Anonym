
const sign_up_validate = require('../Validation/signup')
const sign_in_validate = require('../Validation/signin')
const Profile = require('../Model/Profile')
const jwt = require('jsonwebtoken')

// 1. Sign up
// 2. Sign in
// 3. Sign out
// 4. verify in future may be

module.exports.sign_in = async (req, res)=> {
    /*
        expected req.body { email, password}
        check if valid
        set cookie
    */
    const data = req.body;
    const invalid = sign_in_validate(data);
    if(invalid){
        res.status(403).send({invalid: invalid})
        return
    }
    let profile = await Profile.findOne({email: data.email, password: data.password})
    if(!profile){
        res.status(404).send()
        return 
    }
    const token = jwt.sign({
        uid: profile._id
      }, process.env.SESSION_SECRET);
    
    res.cookie('anonym_session', token); // corrently signs in already, will verify mail next time.
    res.status(200).send(); 
}

module.exports.sign_up = async (req, res)=> {
    /*
        expected req.body { username, email, password}
        check if valid
        check if username unique
        set cookie (currently)
    */
    const data = req.body;
    const invalid = sign_up_validate(data);
    if(invalid){
        res.status(403).send({invalid: invalid})
        return
    }
    // data is valid
    if(await Profile.findOne({username: data.username}).countDocuments()){ // is there any duplicate?
        res.status(403).send({ invalid: "\"username\" exists already"})
        return;
    }
    let profile = new Profile(data);
    profile = await profile.save()
    const token = jwt.sign({
        uid: profile._id
      }, process.env.SESSION_SECRET);
    
    res.cookie('anonym_session', token); // corrently signs in already, will verify mail next time.
    res.status(200).send(); 
}

module.exports.sign_out = async (req, res)=> {
    /* removes cookie */
    res.clearCookie('anonym_session');
    res.send();
}