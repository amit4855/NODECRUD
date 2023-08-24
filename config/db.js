const mongoose = require('mongoose');
mongoose.connect(process.env.DBURL).then(()=>{
    console.log("succsefully connected");
}).catch((err)=>{
    console.log("failed connection"+err);
})
