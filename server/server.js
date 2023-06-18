const express = require('express');

const roomsRoute = require('../server/routes/roomsRoute')

const dbconfig =  require('./db.js')

const app = express();


const port = process.env.PORT || 5000;

app.use(express.json());
app.use('/api/rooms',roomsRoute);


app.listen(port , ()=>{
    console.log(`server is running on port ${port} `);
})