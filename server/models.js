const pool = require('./database/postgres.js').pool;

pool.on('error', (err) => {
  console.error(`Failed to connect to database: ${err}`);
  process.exit(-1);
});

module.exports = {
  // questions: {
  //   get:  function (product_id, count, page, cb) {
  //     var finalRes = {};
  //     const queryString = `
  //     SELECT question_id, question_body, question_date, asker_name, question_helpfulness, reported, asker_email
  //     FROM questions WHERE product_id=$1 AND reported = false ORDER BY question_id LIMIT $2 OFFSET $3;`;
  //     const values = [product_id, count, count * (page - 1)];
  //     pool.query(queryString, values, function(err, result) {
  //       if (err) {
  //         throw err;
  //       }
  //       finalRes.product_id = product_id;
  //       finalRes.results= result.rows;
  //       finalRes.results.map(question => {

  //         const queryString = `SELECT body,answer_date,answerer_name,helpfulness,id AS answer_id,reported,answerer_email
  //         FROM answers WHERE question_id=$1 ORDER BY answer_id LIMIT $2 OFFSET $3;`;
  //         const values = [question.question_id, count,count * (page - 1)];
  //         pool.query(queryString, values, function(err, result) {
  //           var answerRes = {}
  //           result.rows.forEach(res => {
  //             answerRes[res.answer_id] = res;
  //           })
  //           question.answers = answerRes;
  //         })

  //       })
  //       console.log(finalRes)


  //       cb(finalRes);
  //     });
  //   }
  // },

  questions: {
    get:  function (product_id, count, page, cb) {
      const queryString = `
      SELECT questions.question_id, question_body, question_date, asker_name, question_helpfulness, questions.reported, asker_email,
      body,answer_date,answerer_name,helpfulness,answers.id AS answer_id, answerer_email
      photo_url
      FROM questions
      LEFT JOIN answers on questions.question_id = answers.question_id
      LEFT JOIN photos on photos.answer_id = answers.id
      WHERE questions.product_id=$1 AND questions.reported = false
      ORDER BY questions.question_id DESC LIMIT $2 OFFSET $3;`;
      const values = [product_id, count, count * (page - 1)];
      pool.query(queryString, values, function(err, result) {
        if (err) {
          throw err;
        }

        var questions = {};
        questions["product_id"] = product_id;
        questions["results"] = []

        var question_ids = [... new Set(result.rows.map(a => a.question_id))]

        result.rows.forEach(question => {
          var que = {};
          que['question_id'] = question.question_id;
          que['question_body'] = question.question_body;
          que["question_date"] = question.question_date;
          que["asker_name"] = question.asker_name;
          que["question_helpfulness"] = question.question_helpfulness;
          que["reported"] = question.reported;
          que["asker_email"] = question.asker_email;
        })

        for (var id of question_ids) {
          var qs  = result.rows.filter(q => q.question_id === id);
          var que = {};
          que['question_id'] = qs[0].question_id;
          que['question_body'] = qs[0].question_body;
          que["question_date"] = qs[0].question_date;
          que["asker_name"] = qs[0].asker_name;
          que["question_helpfulness"] = qs[0].question_helpfulness;
          que["reported"] = qs[0].reported;
          que["asker_email"] = qs[0].asker_email;


          var answers = {};
          for (var i = 0; i < qs.length; i++) {
            var answer = {};
            answer['id'] = qs[i].answer_id;
            answer['body'] = qs[i].body;
            answer['answer_date'] = qs[i].answer_date;
            answer['answerer_name'] = qs[i].answerer_name;
            answer['helpfullness'] = qs[i].helpfullness;
            answer['photos'] = [qs[i].photo_url];
            answers[qs[i].answer_id] = answer;
          }
          que["answers"] = answers;
          questions['results'].push(que);
        }
        // questions["answers"] = answers;
        // console.log('testing',questions)
        //loop each question, find all answer, append to the question_Id
        cb(questions);
      });
    },

    post: function(product_id, body, name, email, cb) {
      const queryString = `INSERT INTO questions (product_id, question_body, asker_name, asker_email, question_date)
      VALUES ($1, $2, $3, $4, NOW());`
      const values = [product_id, body, name, email];
      pool.query(queryString, values, function(err, result) {
        if (err) {
          throw err;
        }
        cb();
      })
    },

    report: function(question_id, cb) {
      const queryString = `UPDATE answers SET reported = true WHERE id = $1`;
      const values = [question_id];
      pool.query(queryString, values, function(err, result) {
        if (err) {
          throw err;
        }
        cb();
      })
    },

    helpful: function(question_id, cb) {
      const queryString = `UPDATE answers SET helpfulness = helpfulness + 1 WHERE id = $1`;
      const values = [question_id];
      pool.query(queryString, values, function(err, result) {
        if (err) {
          throw err;
        }
        cb();
      })
    }
  },

  answers: {
    get: function(question_id, count, page) {
      const queryString = `SELECT body,answer_date,answerer_name,helpfulness,id AS answer_id,reported,answerer_email
      FROM answers WHERE question_id=$1 ORDER BY answer_id LIMIT $2 OFFSET $3;`;
      const values = [question_id, count,count * (page - 1)];
      pool.query(queryString, values, function(err, result) {
        if (err) {
          throw err;
        }
        cb(result);
      });
    },

    post: function(question_id, body, name, email, cb) {
      const queryString = `INSERT INTO answers (question_id, body, answerer_name, answerer_email, answer_date)
      VALUES ($1, $2, $3, $4, NOW()) RETURNING id; `;
      const values = [question_id, body, name, email];
      pool.query(queryString, values, function(err, result) {
        if (err) {
          throw err;
        }
        cb(result);
      })
    },

    helpful: function(answer_id, cb) {
      const queryString = `UPDATE answers SET helpfulness = helpfulness + 1 WHERE id = $1`;
      const values = [answer_id];
      pool.query(queryString, values, function(err, result) {
        if (err) {
          throw err;
        }
        cb();
      })
    },

    report: function(answer_id, cb) {
      const queryString = `UPDATE answers SET reported = true WHERE id = $1`;
      const values = [answer_id];
      pool.query(queryString, values, function(err, result) {
        if (err) {
          throw err;
        }
        cb();
      })
    }
  },

  photos: {
    post: function(answer_id, photo_url, cb) {
      const queryString = `INSERT INTO photos(answer_id, photo_url) VALUES ($1, $2);`;
      const values = [answer_id, photo_url];
      pool.query(queryString, values, function(err, res) {
        if (err) {
          throw err;
        }
        cb();
      })
    }
  },
};