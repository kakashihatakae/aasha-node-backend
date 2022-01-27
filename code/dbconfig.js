const Pool = require('pg').Pool;

const dbconfig = new Pool({
  user: "postgres",
  password: "02536575578",
  database: "users",
  host: "localhost",
  port: 5432
});

module.exports = dbconfig;