var express = require('../config/express')();
var request = require('supertest')(express);

describe('ProdutosController', function () {
    beforeEach(function(done){
        var conn = express.infra.connectionFactory();
        conn.query('delete from produtos',function(error,resultado){
            if(!error){
                done();
            }
        })
    });

    it('listagem json', function (done) {
        request.get('/produtos')
            .set('Accept', 'application/json')
            .expect('Content-type',/json/)
            .expect(200, done)
    });
    it('cadastro de novo produto com dados inválidos', function(done){
        request.post('/produtos')
            .send({titulo:"", descricao:"novo Livro"})
            .expect(400, done)
    });

    it('cadastro de novo produto com dados válidos', function(done) {
        request.post('/produtos')
            .send({titulo:"Novo livro", descricao:"novo Livro", preco: 20.25})
            .expect(302,done)
    });
    
    after(function(done){
        var conn = express.infra.connectionFactory();
        conn.query('delete from produtos',function(error,resultado){
            if(!error){
                done();
            }
        })
    });
})