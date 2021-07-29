var express = require('express');
const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.connect('mongodb+srv://ABROAD_HoonJoo:aorskdlt11@cluster0.4oica.mongodb.net/ABROAD?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.on('connected', ()=> {
    console.log('Mongoose is connected!!');
});

const tableSchema = new Schema({
    id : Schema.Types.ObjectId,
    koUniv : {type : String, required : true},
    continent : {type : String, required : true},
    country : {type : String, required : true},
    forUniv : {type : String, required : true},
    TO : {type : Number, required : true},
    period : {type : String, required : true},
 });
 
 tableSchema.path('__id');
 
 tableSchema.set('collection', 'table');
 
 const table = mongoose.model('table', tableSchema);
 
 table.find({}).then((tables)=>{
     tableResult = JSON.stringify(tables);
 }).catch((e)=>{
     console.log(e);
 });

module.exports = table;