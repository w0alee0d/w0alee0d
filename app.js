const express = require('express')
const mongoose = require('mongoose')
const Mydata = require("./Models/mydataSchema")
app.use(express.static('public'))



const app = express()
const port = 10200

// Middleware to parse the body of POST requests
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')


mongoose.connect("mongodb+srv://WaLeeD:ELeFNRCJPfPIwr8J@waleed.wqxn4at.mongodb.net/all-data?retryWrites=true&w=majority&appName=Waleed")
  .then(() => {
    app.listen(port, () => {
      console.log(`http://localhost:${port}/`)
    })
  })
  .catch((err) => {
    console.log(err) // Log the actual error
  })

  app.get('/', (req, res) => {
   Mydata.find()
  .then((result) => {
    res.render('home', {mytitle:"Home Page", arr: result })
    
  }).catch((err) =>{
    console.log(err);})
  })








app.post('/', (req, res) => {
  console.log(req.body)
  const mydata = new Mydata(req.body)

  mydata.save()
    .then(() => {
      res.redirect("/")
    })
    .catch((err) => {
      console.log(err) // Log the error if save fails
      res.status(500).send("Error saving data")
    })
})
