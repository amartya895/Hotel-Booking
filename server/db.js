const mongoose = require('mongoose');
const mongoUrl = 'mongodb+srv://amartyasen:amartya@cluster0.tlqtekf.mongodb.net/mern-hotel';

mongoose.connect(mongoUrl , {useUnifiedTopology:true, useNewUrlParser:true});

const connection = mongoose.connection;

connection.on('error',()=>{
    console.log('MongoDb connection failed');
});

connection.on('connected',()=>{
    console.log('Mongodb connected Successfully');
})

module.exports = mongoose;


