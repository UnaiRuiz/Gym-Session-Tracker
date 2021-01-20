const jwt = require('jsonwebtoken');
const router = require("express").Router();

// Middlewares
router.get('/gymsession', function (req, res, next) {
    const token = req.headers.auth;
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                message: 'Auth failed'
            });
        } else {
            req.userId = decoded.id;
            next();
        }
    })
})

router.post('/gymsession/add', function (req, res, next) {
    const token = req.body.auth;
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                message: 'Auth failed'
            });
        } else {
            req.userId = decoded.id;
            next();
        }
    })
})

router.use('/gymsession/edit', function (req, res, next) {
    const token = req.body.auth;
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                message: 'Auth failed'
            });
        } else {
            req.userId = decoded.id;
            console.log("ey")
            next();
        }
    })
})

router.use('/gymsession/delete/:id', function (req, res, next) {
    const token = req.body.auth;
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                message: 'Auth failed'
            });
        } else {
            req.userId = decoded.id;
            console.log("ey")
            next();
        }
    })
})

module.exports = router;
