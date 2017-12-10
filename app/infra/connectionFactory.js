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
    if(process.env.NODE_ENV === 'test'){
        var urlDeConexao = process.env.CLEARDB_DATABASE_URL;
        var grupos = urlDeConexao.match(/mysql:\/\/(.*):(.*)@(.*)\/(.*)?(.*)\?reconnect=true/);
        return mysql.createConnection({
            host: grupos[3],
            user: grupos[1],
            password: grupos[2],
            database: grupos[5]
        });
    }
}

module.exports = function(){
    return createDBConnection;
}