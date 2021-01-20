const GymSession = require("../models/gymsession.model");

exports.listGymSessions = (req, res) => {
    GymSession.find({UserId: req.userId}, (err, result) => {
        if (err) {
            console.log(err);
        }
        res.send(result); //TODO enviar las sesiones ordenadas por fecha
    })
};

exports.addGymSession = (req, res, next) => {
    const {date, duration, description, sup} = req.body.gymsession
    const gymsession = new GymSession({ Date: date, Duration: duration, Description: description, Sup: sup, UserId: req.userId });
    try {
        gymsession.save();
    } catch (err) {
        console.log(err);
    }
};

exports.deleteGymSession = (req, res) => {
    try {
        GymSession.findByIdAndRemove(req.params.id).exec();
    } catch (err) {
        console.log(err);
    }
};

exports.editGymSession = (req, res) => {
    const {date, duration, description, sup, id} = req.body.gymsession
    try {
        GymSession.findByIdAndUpdate(id, { Date: date, Duration: duration, Description: description, Sup: sup, UserId: req.userId }, { new: true }, (err, response) => {
            if (err) return res.status(500).send(err);
            return res.send(response);
        });
    } catch (err) {
        console.log(err);
    }
};