const {Pool} = require('pg')
require('dotenv').config()

const pool = new Pool({
  host: process.env.HOST,
  port: process.env.PORT,
  database: process.env.DATABASE,
  user: process.env.USERNAME,
  password: process.env.PASSWORD
})

pool.connect();

// pool.on('connect', (client) => {
//   console.log('Connected to DB')
// })

// pool.on('error', (err, client) => {
//   console.error('Error connecting to DB', err);
// });

module.exports.pool = pool;
