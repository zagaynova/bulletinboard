var pg = require('pg');
var express = require( 'express')
const pug = require('pug');
// const router = express.Router();
// const path = require('path');

var go = 000060;
const app = express()


var connectionString = 'postgres://' + process.env.POSTGRES_USER + ':' + process.env.POSTGRES_PASSWORD + '@localhost/bulletinboard';

console.log(connectionString);

const allPosts = pug.compileFile('./views/show.pug');
//making web server
app.get('/', (req, res) => { 
//connect to a database
	pg.connect(connectionString, function(err, client, done) {

		//console.log(err);
		//console.log(client);

	  client.query('select * from messages', function(err, result) {


	    //console.log(result.rows[0].body);
	    done();
	    pg.end();
	    res.send(allPosts({"messages" : result.rows}));
	  });
	});
})

//nieuwe route

const listener = app.listen(8080, () => {
    console.log('server has started at ', listener.address().port)
});
