import 'dotenv/config.js'
import express from "express"
import { connection } from "./db/connection/connection.js"
import { allRoutes } from "./src/modules/routes.js"
import { AppError } from "./src/utilis/AppError.js"

const app=express()
const port=3000

app.use(express.json())
app.use("/uploads",express.static("uploads"))
connection()
allRoutes(app)
app.use("*", (req, res, next) => {
    next(new AppError(`url not found ${req.originalUrl}`,404))
    
})
/*app.use((err, req, res, next) => {
    
    res.status(err.statusCode).json({message:err.message})
  })*/

app.get('/',(req,res)=>res.send('hello'))
app.listen(port,()=>console.log(`Example app listening on port ${port}`))