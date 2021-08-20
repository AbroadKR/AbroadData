require('dotenv').config();
const express = require("express");
const path = require('path');
const app = express();
const { table } = require('./db/database');
const { PORT } = process.env;


app.use(express.static(path.resolve(__dirname, '../client/build')));

app.listen(PORT, ()=>{
    console.log("Listening on 8080 Port💡")
})

app.get('/api/getKoUnivs', function(req, res){
    table.find({}, (err, koUnivs) => {
        if (err) {
            res.end();
            return;
        }
        res.json(koUnivs);
    })
    .select('koUniv')
    .distinct('koUniv');
});

app.get("*", (req,res)=>{
    res.sendFile(path.join(__dirname, '/build/index.html'));
})