const express = require('express');
const app = express();

const controller = require('./controllers.js')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.get('/', (req, res) => {
  res.status(200).send('Hello World!');
});

app.get("/qa/questions", controller.questions.get);
app.post("/qa/questions")

app.post("/qa/questions/:question_id/answers")

app.put("/qa/answers/:answer_id/helpful")

app.put("/qa/answers/:answer_id/report");

module.exports = app;




