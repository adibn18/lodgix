const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.urlencoded({extended : true}));
const PORT = process.env.PORT
app.get("/",(req,res) => {
    res.send("Hello , from express");
});
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});