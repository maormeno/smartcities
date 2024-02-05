const { Pool } = require('pg');

var config = {
    user: 'postgres', 
    database: 'emergencies', 
    password: 'emergencies', 
    host: 'emergencies-db.cs9bpwf0abyc.us-east-1.rds.amazonaws.com', 
    port: 5432, 
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000
};


const getEmergency = async (id) => {
  const pool = new Pool(config);
  
  
  pool.on('error', function (err, client) {
      console.error('idle client error', err.message, err.stack);
  });
  var emergency = null;
  const res = await pool.query('SELECT * from emergencies where id=$1::int', [id])
  emergency = res.rows[0];
  pool.end();
  return emergency;
}

exports.getEmergency = getEmergency;
