const express = require('express');
const app = express();

const controller = require('./controllers.js')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.get('/', (req, res) => {
  res.status(200).send('Hello World!');
});

app.get("/qa/questions", controller.questions.get);

app.post("/qa/questions", controller.questions.post);

// app.post("/qa/questions/:question_id/answers", controller.answers.post);

// app.put("/qa/questions/:question_id/helpful", controller.questions.helpful);

// app.put("/qa/questions/:question_id/report", controller.questions.report);

app.put("/qa/answers/:answer_id/helpful", controller.answers.helpful);

app.put("/qa/answers/:answer_id/report", controller.answers.report);

module.exports = app;




