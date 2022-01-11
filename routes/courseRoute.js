const express = require("express");
const courseController = require("../controllers/courseController");
const roleMiddleware = require('../middlewares/roleMiddware')

const router = express.Router();

router.route("/").post(roleMiddleware(["Teacher", "Admin"]), courseController.createCourse); //localhost:3000/courses
router.route("/").get(courseController.getAllCourses);
router.route("/:slug").get(courseController.getCourse);
router.route("/enroll").post(courseController.enrollCourse);
router.route("/release").post(courseController.releaseCourse);
router.route("/:slug").delete(courseController.deleteCourse);
router.route("/:slug").put(courseController.updateCourse);

module.exports = router;
