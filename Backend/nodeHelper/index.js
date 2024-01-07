const express = require("express")
const app = express()
const PORT = 5000
const filesRoute = require("./routes/filesRoute")
const cors = require("cors")

app.use(cors())
app.use("/files",filesRoute)

app.listen(PORT,()=>{
    console.log("server running on port ",PORT)
})