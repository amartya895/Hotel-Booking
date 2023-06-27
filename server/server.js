const express = require('express');

const roomsRoute = require('../server/routes/roomsRoute');
const usersRoute = require('../server/routes/userRoute');
const bookingRoute = require('../server/routes/bookingsRoute');

const dbconfig =  require('./db.js')

const app = express();


const port = process.env.PORT || 5000;

app.use(express.json());
app.use('/api/rooms',roomsRoute);
app.use('/api/users',usersRoute);
app.use('/api/bookings' , bookingRoute);


app.listen(port , ()=>{
    console.log(`server is running on port ${port} `);
})