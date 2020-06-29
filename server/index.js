const express = require('express');
const cors = require('cors')
const mongoose=require('mongoose');
const bodyParser = require('body-parser');
const Rental = require('./models/rental');
const FakeDb=require('./fake-db');

const rentalRoutes=require('./routes/rentals');
const userRoutes=require('./routes/users');
const bookingRoutes=require('./routes/bookings');

mongoose.connect('mongodb://localhost:27017/bwm-react-dev').then(()=>{
    const fakeDb = new FakeDb();
    fakeDb.seeDb()
})

const app = express();
app.use(bodyParser.json());
app.use(cors())



app.use('/api/v1/rentals',rentalRoutes);
app.use('/api/v1/users',userRoutes);
app.use('/api/v1/bookings',bookingRoutes);



const PORT = process.env.PORT||3001;

app.listen(PORT,()=>{
    console.log("I AM Running");
})