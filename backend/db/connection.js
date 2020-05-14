/* CONNECTION WITH DATABASE */

const monk = require('monk');
// path to the database
const db = monk('localhost/auth-for-noobs');

module.exports = db;
