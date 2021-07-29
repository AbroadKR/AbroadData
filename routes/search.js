const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/results', function(req, res) {
    const datas = req.body
    console.log(datas);
    res.sendFile(path.join(__dirname,'../public/result.html'));
  });
  
module.exports = router;