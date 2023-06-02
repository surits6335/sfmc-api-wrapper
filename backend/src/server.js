require('./config');
const express = require ('express');
const userRouter = require('./routes/user');
const cors=require('cors');

const app = express();

app.use(express.json());
app.use(cors());
app.use(userRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on Port ${process.env.PORT}`);
});