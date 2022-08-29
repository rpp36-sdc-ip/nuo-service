var Pool = require('pg-pool')

const config = {
  host: 'localhost',
  port: 5432,
  database: 'SDC'
};

var pool = new Pool(config);

// pool.on('connect', (client) => {
//   console.log('Connected to DB')
// })

// pool.on('error', (err, client) => {
//   console.error('Error connecting to DB', err);
// });

module.exports.pool = pool;
