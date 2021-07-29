const express = require('express');
const router = express.Router();
const path = require('path');
const table = require('../db/database');

// router.get('tableData', function(req, res){
//     table.find({}, (err, tables) => {
//         if (err) {
//             res.end();
//             return;
//         }
//         tables.JSON(tables);
//     });
// });

module.exports = router;