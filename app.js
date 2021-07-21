const express = require('express');
const app = express();
const path = require('path');
const table = require('./db/database');

// Router // 
const indexRouter = require('./routes/index');
const tableRouter = require('./routes/tableData');


app.use('/public', express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.text());

app.listen(8080, function(){
    console.log('listening on 8080')
});

app.use('/', indexRouter);

app.get('/getKoUnivs', function(req, res){
    table.find({}, (err, tables) => {
        if (err) {
            res.end();
            return;
        }
        res.json(tables);
    })
    .select('koUniv')
    .distinct('koUniv');
});

app.post('/getContinents', (req, res)=>{
    const selectedKoUniv = req.body;
    table.find({koUniv : selectedKoUniv}, (err, tables)=>{
        if(err){
            res.end();
            return;
        }
        res.json(tables);
    })
    .select('continent')
    .distinct('continent');
});

app.post('/getCountries', (req, res)=>{
    const selectedKoUniv = req.body;
    table.find({koUniv : selectedKoUniv}, (err, tables)=>{
        if(err){
            res.end();
            return;
        }
        res.json(tables);
    })
    .select('country')
    .distinct('country');
});

app.post('/getCountriesByContinent', (req,res)=>{
    const selectedContinent = req.body;
    console.log(selectedContinent['selConti']);
    console.log(selectedContinent['koVal']);
    table.find({koUniv : selectedContinent['koVal'] ,continent : {$in:selectedContinent['selConti']}}, (err, tables)=>{
        if(err){
            res.end();
            return;
        }
        res.json(tables);
    })
    .select('country')
    .distinct('country');
});