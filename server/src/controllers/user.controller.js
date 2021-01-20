const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

exports.signup = (req, res) => { 
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({ Username: username }, async function (err, user) {
        if (err) {
            console.log(err);
        }
        if (user) {
            res.json({ auth: false, message: "Username already exists" });
        } else {
            const user = new User({ Username: username, Password: password });
            try {
                user.save();
            } catch (err) {
                console.log(err);
            }
            res.json({ auth: true });
        }
    });
};

exports.signin = async (req, res) => { 
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({ Username: username }, async function (err, user) {
        if (err) {
            console.log(err);
        }
        if (!user) {
            res.json({ auth: false, message: "Wrong username" });
        } else {
            if (user.Password === password) {
                const id = user.id
                const token = jwt.sign({ id }, process.env.TOKEN_SECRET, {
                    expiresIn: 1200,
                })
                res.json({ auth: true, token: token, username: user.username });
            } else {
                res.json({ auth: false, message: "Wrong credentials" });
            }
        }
    });
};

exports.isAuth = (req, res) => {
    const token = req.headers.auth;
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.json({
                auth : false
            });
        } else {
            return res.json({
                auth : true
            });
        }
    })
};