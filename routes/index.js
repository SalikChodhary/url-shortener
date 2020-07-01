const express = require('express')
const router = express.Router();

const Url = require('../models/Url')

// @route   GET /:code
// @desc    Redirect to long/original URL
router.get('/:code', (req, res) => { 
  Url.findOne({ urlCode: req.params.code })
    .then((data) => {
      console.log(req.params.code)
      if(data) { 
        return res.redirect(data.longUrl);
      } else { 
        return res.status(404).json('No Url found')
      }
    })
    .catch(err => { 
      console.error(err);
      res.status(500).json('Server error');
    })
})

module.exports = router;