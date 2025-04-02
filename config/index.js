const database = require('./database');
const session = require('./session');
const layout = require('./layout');
const service = require('./service');

module.exports = {
    database,
    session : 'mysecretkey',
    layout,
    service,
    pagination: 20,
    debug : true,
    port : 4000,
    cookie_secretkey : process.env.COOKIE_SECRETKEY
}


