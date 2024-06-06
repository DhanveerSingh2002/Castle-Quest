const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const router = require('./routes/User.route');

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO).then(()=>{
    console.log("connected to mongodb");
}).catch((err)=>{
    console.log(err);
});

app.listen(3000, () => {
    console.log("server is running on port 3000")
})

// app.get('/', (req, res) => {
//     res.json({
//         message: "hello world",
//         name: "Dhanna Don",
//     });
// })

app.use("/test", router)