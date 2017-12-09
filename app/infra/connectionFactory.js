var mysql = require('mysql');
function createDBConnection(){
    if(!process.env.NODE_ENV){
        return mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'casaCodigoNodejs'
        });
    }
    if(process.env.NODE_ENV === 'test'){
        return mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'casaCodigoNodejs_test'
        });
    }
}

module.exports = function(){
    return createDBConnection;
}