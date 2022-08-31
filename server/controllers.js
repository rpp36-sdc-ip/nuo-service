const models = require('./models');

module.exports = {
  questions: {
    get: function(req, res) {
      try {
      var product_id = req.query.product_id;
      var count = req.query.count || 100;
      var page = req.query.page || 1;
      var finalRes = {};
      var finalAnswers = {}
      models.questions.get(product_id, count, page, function(result) {
        res.status(200).send(result);
      });
    } catch {
      res.status(500);
    }
    },

    post: function(req, res) {
      try {
        var product_id = req.body.product_id;
        var body = req.body.body;
        var name = req.body.name;
        var email = req.body.email;
        models.questions.post(product_id, body, name, email, function() {
          res.status(201);
          res.end();
        });
      } catch {
        res.status(500);
      }
    },

    helpful: function(req, res) {
      try {
        var question_id = req.params.question_id;
        models.questions.helpful(question_id, function() {
          res.status(204).end();
        })
      } catch {
        res.status(500).send(err);
      }
    },

    report: function(req, res) {
      try {
        var question_id = req.params.question_id;
        models.questions.report(question_id, function() {
          res.status(204).end();
        })
      } catch {
        res.status(500).send(err);
      }
    }
  },

  answers: {
    helpful: function(req, res) {
      try {
        var answer_id = req.params.answer_id;
        models.answers.helpful(answer_id, function() {
          res.status(204).end();
        })
      } catch {
        res.status(500).send(err);
      }
    },

    report: function(req, res) {
      try {
        var answer_id = req.params.answer_id;
        models.answers.report(answer_id, function() {
          res.status(204).end();
        })
      } catch {
        res.status(500).send(err);
      }
    }

  }
}