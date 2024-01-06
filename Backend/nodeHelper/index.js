const express = require("express")
const app = express()
const PORT = 5000
const upload = require("./routes/upload")
const cors = require("cors")

app.use(cors())
app.use("/files",upload)

app.listen(PORT,()=>{
    console.log("server running on port ",PORT)
})