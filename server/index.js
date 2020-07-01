const express = require('express');
const cors = require('cors')
const mongoose=require('mongoose');
const bodyParser = require('body-parser');
const Rental = require('./models/rental');
const FakeDb=require('./fake-db');
const config = require('./config');


const rentalRoutes=require('./routes/rentals'),
      userRoutes=require('./routes/users'),
      bookingRoutes=require('./routes/bookings');

mongoose.connect(config.DB_URI).then(()=>{
  if(process.env.NODE_ENV !== 'production'){
    const fakeDb = new FakeDb()
    // fakeDb.seedDb();
  }
    
})

const app = express();
app.use(bodyParser.json());
app.use(cors())



app.use('/api/v1/rentals',rentalRoutes);
app.use('/api/v1/users',userRoutes);
app.use('/api/v1/bookings',bookingRoutes);

if (process.env.NODE_ENV === 'production') {
    const appPath = path.join(__dirname, '..', 'dist');
    app.use(express.static(appPath));
  
    app.get('*', function(req, res) {
      res.sendFile(path.resolve(appPath, 'index.html'));
    });
  }


const PORT = process.env.PORT||3001;

app.listen(PORT,()=>{
    console.log("I AM Running");
})