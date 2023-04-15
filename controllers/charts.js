const express=require('express');
const fs = require('fs');
const { resolve } = require('path');
const router = express.Router();

router.get('/',(req,res)=>{

    
    
    fs.readFile('./data/emission.json', 'utf-8', (err, data) => {

        if (err) {

            console.log(err)
        }

        else {
            console.log(data)
            res.render('chart/index', { title: "Chart", emission: JSON.parse(data),
        
        
        });
        }
    })    

    
})

module.exports=router