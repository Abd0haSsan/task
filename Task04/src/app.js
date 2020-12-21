const express= require('express')
require('./db/mongoose')
const doctorRoutes = require('./routes/doctor')
//const patientRoutes = require('./routes/patient')
// const userRouter = require('./routes/user')
const app = express()
const port = process.env.PORT || 3000
app.use(express.json())

app.use(doctorRoutes)
//app.use(patientRoutes)
//app.use(userRouter)

app.listen(port)