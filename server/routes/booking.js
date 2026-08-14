const express = require("express");
const router = express.Router();
const bookingController = require("../controller/booking");

router.post("/", bookingController.addbooking);
router.get("/:id", bookingController.getBooking);
router.delete("/cancel/:id", bookingController.cancelBooking);
router.put("/update/:id", bookingController.updateBooking);

module.exports = router;