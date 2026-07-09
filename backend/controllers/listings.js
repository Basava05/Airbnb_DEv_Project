const Listing = require("../models/listing");
const { listingSchema } = require("../schema.js");

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

module.exports.index = async (req, res) => {
  const searchQuery = req.query.search ? req.query.search.trim() : "";
  let filter = {};

  if (searchQuery) {
    const regex = new RegExp(escapeRegex(searchQuery), "i");
    filter = {
      $or: [
        { title: regex },
        { location: regex },
        { country: regex },
        { description: regex },
      ],
    };
  }

  const allListings = await Listing.find(filter);
  res.render("listings/index.ejs", { allListings, searchQuery });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");
  if (!listing) {
    req.flash("error", "The listing you looking for is no longer available");
    return res.redirect("/listings");
  }
  res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res, next) => {
  // let {title,description,image,price,country,loacation} = req.body; instead we can use listing[obj name] in new.ejs file then see below syntax
  // let result = listingSchema.validate(req.body);
  // if (result.error) {
  //   throw new ExpressError(400, result.error);
  // }
  if (!req.file) {
    req.flash("error", "Please upload a listing image.");
    return res.redirect("/listings/new");
  }
  const url = req.file.path;
  const filename = req.file.filename;
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };
  await newListing.save();
  req.flash("success", "New listing is added!");
  res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "The listing you looking for is no longer available");
    return res.redirect("/listings");
  }
  res.render("listings/edit.ejs", { listing });
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }

  req.flash("success", "List updated succesfully!");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  req.flash("success", "listing is deleted!");
  res.redirect("/listings");
};
