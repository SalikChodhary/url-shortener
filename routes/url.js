const express = require("express");
const router = express.Router();
const validUrl = require("valid-url");
const shortId = require("shortid");
const config = require("config");

const Url = require("../models/Url");

// @route   POST /api/url/shorten
// @desc    Create short url
router.post("/shorten", (req, res) => {
  const { longUrl, customId } = req.body;
  
  const baseUrl = config.get("baseUrl");

  if (!validUrl.isUri(baseUrl)) {
    //console.log(baseUrl)
    return res.status(401).json("Invalid base url");
  }

  const urlCode = customId ? customId : shortId.generate();

  if (validUrl.isUri(longUrl)) {
    let url = Url.findOne({ longUrl });
    url
      .then((data) => {
        //console.log(data);
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
    res.status(401).json("Invalid long URL");
  }
});

module.exports = router;
