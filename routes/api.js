const express = require('express');

const router = express.Router();

const Memory = require('../models/memory');

router.get('/', (req, res) => {

    Memory.find({}).sort({time: 1})
        .then((data) => {
            console.log('Data: ', data);
            res.json(data);
        })
        .catch((error) => {
            console.log('error: ', daerrorta);
        });
    
});



router.post('/save', (req, res) => {
    console.log('Body: ', req.body);
    const data = req.body;

    const newMemory = new Memory(data);

    newMemory.save((error) => {
        if (error) {
            res.status(500).json({ msg: 'Sorry, internal server error' });
        }
        else {
            res.json({
                msg: 'We received your data!'
            });
        }
    });
});

// router.post('/save', (req, res) => {
//     const {data} = req.body;

//     try{
//         const data = Memory.create(data)
//         res.status(200).json(data)
//     }
//     catch (error){
//         res.status(400).json({error: error.message})
//     }

//     const newMemory = new Memory(data);
// });

router.delete('/delete', (req, res) => {
    const memory = Memory.findOneAndDelete({}).sort({time: -1}).limit(1)
  
        if(!memory){
        res.status(500).json({msg: 'Sorry there was an error deleting record.'})
        }
            res.json({msg: 'Record successfully deleted!!'})
        
   })



module.exports = router;