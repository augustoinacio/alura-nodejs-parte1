module.exports = function (app) {
    app.get('/produtos', function (req, res) {
        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(connection);
        produtosDAO.lista(function(erro, resultado){
            res.format({
                html: function(){
                    res.render('produtos/lista', {lista:resultado});
                },
                json: function(){
                    res.json(resultado);
                }
            });
        })
        connection.end();
    });
    app.delete('/produtos/:id', function(req,res){
        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(connection);
        produtosBanco.buscaPorId(id, function(erro, resultado){
            

        })
    });

    app.get('/produtos/form', function(req,res){
        res.render('produtos/form',{errosValidacao: {}, produto:{}});
    });

    app.post('/produtos', function(req, res){
        var produto = req.body;
        req.assert('titulo','Título é obrigatório').notEmpty();
        req.assert('preco', 'Formato inválido').isFloat();
        var erros = req.validationErrors();
        if(erros){
            res.format({
                html: function(){
                    res.status(400).render('produtos/form',{errosValidacao:erros, produto:produto}); //,{errosValidacao:erros}
                },
                json: function(){
                    res.status(400).json(erros);
                }
            });
            return;
        }
        console.log(produto);
        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(connection);
        produtosDAO.salva(produto, function(erro,resultado){
            res.redirect('/produtos');
        })
    });
}