const express = require('express');
const router = express.Router();
const Rental = require('../models/rental');
const User = require('../models/user');
const { normalizeErrors } = require('../helpers/mongoose');

const UserCtrl = require('../controllers/user');


router.get('/secret', UserCtrl.authMiddleware, function(req, res) {
    res.json({"secret": true});
  });
  

router.get('',(req,res)=>{
    Rental.find({},function(err,foundRentals){
        res.json(foundRentals);
    })

})

router.get('/:id',(req,res)=>{
    const rentalId=req.params.id;

    Rental.findById(rentalId,function(err,foundRental){
        if (err) {
            return res.status(422).send({errors: [{title: 'Rental Error!', detail: 'Could not find Rental!'}]});
          }
      
        res.json(foundRental);
    })
})

module.exports=router;