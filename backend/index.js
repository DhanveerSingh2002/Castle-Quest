const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRouter = require('./routes/User.route');
const authRouter = require('./routes/Auth.route');
const listingRouter = require('./routes/listing.route');
const cookieParser = require('cookie-parser');
const path = require('path');

dotenv.config();

const app = express();
app.use(express.json());

app.use(cookieParser());

mongoose.connect(process.env.MONGO).then(()=>{
    console.log("connected to mongodb");
}).catch((err)=>{
    console.log(err);
});

const __directoryName = path.resolve();

app.listen(3000, () => {
    console.log("server is running on port 3000")
})

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

app.use(express.static(path.join(__directoryName, '/frontend/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__directoryName, 'frontend','dist','index.html'));
})

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    })
})