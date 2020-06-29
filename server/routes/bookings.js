const express = require('express');
const router  = express.Router();
const UserCtrl=require('../controller/user');
const BookingCtrl=require('../controller/booking');

router.post('',UserCtrl.authMiddleware,BookingCtrl.createBooking);

module.exports=router;