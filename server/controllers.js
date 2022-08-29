const models = require('./models');

module.exports = {
  questions: {
    get: function(req, res) {
      var product_id = req.query.product_id;
      var count = req.query.count || 100;
      var page = req.query.page || 1;
      var finalRes = {};
      var finalAnswers = {}
      models.questions.get(product_id, count, page, function(result) {
        // finalRes.product_id = product_id;
        // finalRes.results= result.rows;

        res.status(200).send(result);
      });
    }
  }
}