const express = require("express");
const crudController = require("../Controllers/crudController");
const protect = require("../middleware/authmiddleware");
const router = express.Router();

router.route("/createQuery").post(crudController.createQuery);
router.route("/getQuery").get(protect, crudController.getQueries);
router.route("/getQueryDetails").get(protect, crudController.getQueryDetails);
router.route("/getQueryWeek").get(protect, crudController.getQueryWeek);
router.route("/getQueryYear").get(protect, crudController.getQueryYear);
router.route("/deleteQuery").delete(protect, crudController.deleteQuery);
router.route("/updateQuery").patch(protect, crudController.updateQuery);
router.route("/genderWiseQuery").get(crudController.genderWiseQuery);

module.exports = router;
