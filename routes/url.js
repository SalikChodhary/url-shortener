const express = require("express");
const router = express.Router();
const validUrl = require("valid-url");
const shortId = require("shortid");
const config = require("config");

const Url = require("../models/Url");

// @route   POST /api/url/shorten
// @desc    Create short url
router.post("/shorten", async (req, res) => {
  const { longUrl, customId } = req.body;
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? config.get("prodBaseUrl")
      : config.get("devBaseUrl");

  if (!validUrl.isUri(baseUrl))
    return res.status(500).json("Sorry, encountered server error!");

  if (customId) {
    //Could check with custom ID instead, but that ignores dev and prod server differences.
    if (await Url.findOne({ shortUrl: baseUrl + "/sm/" + customId })) {
      return res
        .status(409)
        .json(
          "This custom ID is already in use! Please use another custom ID."
        );
    }
  }
  const urlCode = customId ? customId : shortId.generate();

  if (validUrl.isUri(longUrl)) {
    let url = Url.findOne({ longUrl });
    url
      .then((data) => {
        if (data) {
          res.json(data);
        } else {
          const shortUrl = baseUrl + "/sm/" + urlCode;
          const newUrl = new Url({
            longUrl,
            shortUrl,
            urlCode,
            date: new Date(),
          });
          newUrl.save().then(() => res.json(newUrl));
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json("Server Error");
      });
  } else {
    res.status(500).json("Sorry, encountered server error!");
  }
});

module.exports = router;
