const mongoose = require('mongoose')
mongoose.set("strictQuery", false);
const mongoURI = "mongodb+srv://uzairhakeem71:uzair123456789@cluster0.rbb6dtw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"


const connectToMongo = async () => {
      mongoose.connect(mongoURI).then(() => {
        console.log("Connected to Mongodb Successfully!");
      }).catch((error) => {
        console.log(error)
      })
    };
  module.exports = connectToMongo; 