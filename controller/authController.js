const { Account, Profile } = require("../models");
const { generateToken } = require("../services/middleware");

const login = (req, res) => {
    let { email, password, role } = req.body;
    let response = {
        access_token: '',
        data: {}
    }
    try {
        Account.findOne({ email: email, password: password, role: role }, { password: false })
            .populate("profile").exec((err, user) => {
                console.log(user)
                if (err) {
                    res.status(500).json(err)
                } else {
                    if (user === null || user === undefined) {
                        res.status(401).send({
                            message: 'Invalid Credentials'
                        })
                        return
                    }
                    response.access_token = generateToken(user._id);
                    response.data = {
                        user: user,
                        role
                    }
                    res.json(response)
                }
            })
    } catch (error) {
        res.status(500).send({ message: error })
    }
}

const createUserAccount = (details, callback, onError = null) => {
    try {
        let account = new Account(details)
        account.save((err, account) => {
            if (err) return onError(err);
            let details = account.populate('profile').execPopulate();
            details
                .then(details => {
                    callback(details)
                })
                .catch(err => onError(err))
        })
    } catch (error) {
        onError(error)
    }
}

const register = (req, res) => {
    try {
        let info = JSON.parse(req.body.info)
        let profile = new Profile(info);
        profile.save((err, profile) => {
            let imageName = '';
            if (req.file) {
                imageName = req.file.filename
            }
            if (err) return res.status(501).send(err)
            createUserAccount({
                profile: profile._id,
                email: info.email,
                password: info.password,
                profilePicture: imageName,
            }, (acct) => {
                let response = {
                    access_token: '',
                    data: {}
                }
                let saved = acct;
                saved.password = '';
                response.data = saved;
                response.access_token = generateToken(saved._id)
                res.json(response)
            }, err => {
                res.status(500).send(err)
            })
        });
    } catch (error) {
        console.log(error);
        res.status(502).send(error)
    }
}

module.exports = {
    login,
    register
}