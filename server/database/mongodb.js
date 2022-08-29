const mongoose = require('mongoose')

const productsSchema = new mongoose.Schema({
  product_id: Number,
  name:String,
  category:String,
})

const questionSchema = new mongoose.Schema({
  product_id: Number,
  question_id: Number,
  question_body: String,
  question_date: String,
  asker_name: String,
  question_helpfulness: Number,
  reported: Boolean,
})

const answerSchema = new mongoose.Schema({
  question_id: Number,
  answer_id: Number,
  body: String,
  date: String,
  answerer_name: String,
  helpfulness: Number,
  photos: [ {
    id: Number,
    url: String,
  }]
});

const products = mongoose.model('products', productsSchema)
const questions = mongoose.model('questions', questionSchema)
const answers = mongoose.model('answers', answerSchema)