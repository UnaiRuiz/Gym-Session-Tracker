const router = require("express").Router();

// Controller
const {
  addGymSession,
  listGymSessions,
  editGymSession,
  deleteGymSession
} = require("../controllers/gymsession.controller");

// New GymSession
router.post("/gymsession/add", addGymSession);

// Get All GymSessions
router.get("/gymsession", listGymSessions);

// Edit GymSessions
router.put("/gymsession/edit", editGymSession);

// Delete GymSessions
router.delete("/gymsession/delete/:id", deleteGymSession);

module.exports = router;