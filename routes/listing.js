const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const { listingSchema } = require("../schema.js");
const { storage } = require("../CloudConfig.js");

const listingController = require("../controllers/listings.js");
const multer = require("multer");
const upload = multer({ storage });

router.route("/").get(wrapAsync(listingController.index)).post(
  isLoggedIn,
  upload.single("listing[image]"),
  validateListing,
  wrapAsync(listingController.createListing)
);

//isAuthenticated() is store the user credential and helps to track the user
//New route it must be above the show route because if it is below it the /new is treated as id then server serach for the id named /new!
router.get("/new", isLoggedIn, listingController.renderNewForm);

router
  .route("/:id")
  .get(validateListing, wrapAsync(listingController.showListing))
  .put(
    isOwner,
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  .delete(isOwner, isLoggedIn, wrapAsync(listingController.destroyListing));

//edit route
router.get(
  "/:id/edit",
  isOwner,
  isLoggedIn,
  validateListing,
  wrapAsync(listingController.renderEditForm)
);

module.exports = router;
