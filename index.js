var hapi = require('hapi');
var path = require('path');
var pg = require('pg');


    var client = new pg.Client({
      database:'hapedb',
      user: 'postgres',
      password: 'asdasd'
    });
    client.connect(err => {
        if (err) {
            throw err;
        }
    })


var server = new hapi.Server();
server.connection({
  host:'localhost',
  port:1337
});

server.register(require('vision'), (err) => {

    if (err) {
        throw err;
    }

server.route({
  method:'GET',
  path:'/hello',
  handler:function(request,reply){
    function getdatabase(cb) {
      var sqlquery = 'SELECT * FROM users';
      client.query(sqlquery,(err,result)=>{
        if(err){console.log(err);}
        cb(null,result.rows[0]);
    });

    }

    getdatabase((err,result)=>{
      reply.view('index',{id:id,username:username});
    });

  }
});

server.views({
  engines:{html:require('handlebars')},
  relativeTo:__dirname,
  path:'template'
});


});
server.start(function(){
  console.log("server running at localhost:1337");
});
