const GymSession = require("../models/gymsession.model");

exports.listGymSessions = (req, res) => {
    GymSession.find({}, (err, result) => {
        if (err) {
            console.log(err);
        }
        res.send(result);
    })
};

exports.addGymSession = (req, res) => {
    const date = req.body.date;
    const duration = req.body.duration;
    const description = req.body.description;
    const sup = req.body.sup;
    const gymsession = new GymSession({ Date: date, Duration: duration, Description: description, Sup: sup });
    try {
        gymsession.save();
    } catch (err) {
        console.log(err);
    }
};

exports.deleteGymSession = (req, res) => {
    console.log("eliminar:", req.params.id)
    try {
        GymSession.findByIdAndRemove(req.params.id).exec();
    } catch (err) {
        console.log(err);
    }
};

exports.editGymSession = (req, res) => {
    const newdate = req.body.date;
    const newduration = req.body.duration;
    const newdescription = req.body.description;
    const newsup = req.body.sup;
    try {
        GymSession.findByIdAndUpdate(req.body.id, { Date: newdate, Duration: newduration, Description: newdescription, Sup: newsup }, { new: true }, (err, response) => {
            if (err) return res.status(500).send(err);
            return res.send(response);
        });
    } catch (err) {
        console.log(err);
    }
};