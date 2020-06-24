const express = require('express');
const router = express.Router();
const Rental = require('../models/rental');

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