const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRouter = require('./routes/User.route');
const authRouter = require('./routes/Auth.route');

dotenv.config();

const app = express();
app.use(express.json());

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

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);