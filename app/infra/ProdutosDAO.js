module.exports = function () {
    return ProdutoDAO;
}

ProdutoDAO.prototype.lista = function (callback) {
    this._connection.query('select * from produtos', callback);
}

ProdutoDAO.prototype.buscaPorId = function(produto, callback){
    this._connection.query('select * from produtos where id = ? ' , produto.id);
}

ProdutoDAO.prototype.excluir = function(produto, callback){
    this._connection.query('delete from produtos where id = ? ', produto.id);
}

ProdutoDAO.prototype.salva = function(produto, callback){
    this._connection.query('insert into produtos set ? ', produto, callback);
}

function ProdutoDAO(connection) {
    this._connection = connection;
}