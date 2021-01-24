const router = require("express").Router();

const {
  addGymSession,
  listGymSessions,
  editGymSession,
  deleteGymSession
} = require("../controllers/gymsession.controller");

// // Routes
router.post("/gymsession/add", addGymSession);
router.get("/gymsession", listGymSessions);
router.put("/gymsession/edit", editGymSession);
router.delete("/gymsession/delete/:id", deleteGymSession);

module.exports = router;