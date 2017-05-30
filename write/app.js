var pg = require('pg');

var connectionString = 'postgres://' + process.env.masha + ':' + process.env.zagaynova + '@localhost/bulletinboard';

//app.get('/', function(req,res){ making a route -- working with a web server
pg.connect(connectionString, function(err, client, done) {
	client.query('insert into hats (name, material, height, brim) values (\'chicken\', \'feathers\', 10, false)', function(err) {
		if(err) {
			throw err;
		}

		done();
		pg.end();
   		// res.render('index', {somekey: somevalue}) //or res.send
  	});
});

