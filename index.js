const express=require("express");
const cors = require("cors");
require("dotenv").config();
const { connection } = require("./db");
const serverless = require("serverless-http")
const { courseRouter} = require("./routes/courses.routes");
const { reviewRouter} = require("./routes/reviews.routes");
const { reportRouter} = require("./routes/report.routes")


const app=express();
app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.status(200).json({ "msg": "Home Page" })
})

app.use("/courses", courseRouter);
app.use("/reviews", reviewRouter);
app.use("/reports", reportRouter);

// app.listen(process.env.PORT,async()=>{
//     try {
//         await connection;
//         console.log("DB is connected")
//         console.log(`server is running at port http://localhost:${process.env.PORT}`)
//     } catch (error) {
//         console.log(error)
//     }
// })

let handler =serverless(app);


module.exports = handler = async (event, context) => {
  // you can do other things here
  const result = await handler(event, context);
  // and here
  return result;
};


