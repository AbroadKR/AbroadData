const express = require('express');
const app = express();
const path = require('path');
const table = require('./db/database');

// Router // 
const indexRouter = require('./routes/index');
const tableRouter = require('./routes/tableData');
const resultRouter = require('./routes/search');


app.use('/public', express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended : false}));

app.listen(8080, function(){
    console.log('listening on 8080')
});

app.use('/', indexRouter);

app.get('/results', resultRouter);

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

app.post('/getTables', (req,res)=>{
    // find 조건 = koUniv, continent, country 
    // 출력할 필드 : 대륙, 국가, 대학명, 선발인원, 파견기간
    const data = req.body;
    console.log(data);
    table.find({
        koUniv : data['koUniv'],
        continent : {$in:data['continent']}, 
        country : {$in:data['country']}}, 
            (err, tables)=>{
                if(err){
                    res.end();
                    return
                }
                res.json(tables);
        })
        .select('continent country forUniv TO period');   
})