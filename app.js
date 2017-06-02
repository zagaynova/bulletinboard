var pg = require('pg');
var express = require( 'express');
var bodyParser = require('body-parser');
const pug = require('pug');

const app = express()
app.use(bodyParser.urlencoded({ extended: true })); 

var connectionString = 'postgres://' + process.env.POSTGRES_USER + ':' + process.env.POSTGRES_PASSWORD + '@localhost/bulletinboard';

function addMessage (title, body) {
	pg.connect(connectionString, function(err, client, done) {
		var insertQuery = "insert into messages (title, body) values ('" + title + "', '" + body + "')";
	  	client.query(insertQuery, function(err, result) {
		    done();
		    pg.end();
	  	});
	});
}

function deleteMessage () {
	pg.connect(connectionString, function(err, client, done) {
		var deleteQuery;
		deleteQuery = "delete from messages where title = 'Missing'";
		client.query(deleteQuery, function(err, result) {
	    	done();
	    	pg.end();
	  	});
	});
}


const allPosts = pug.compileFile('./views/show.pug');
const writePosts = pug.compileFile('./views/write.pug');

//making web server
app.get('/', (req, res) => { 
//connect to a database
	pg.connect(connectionString, function(err, client, done) {
	  	client.query('select * from messages', function(err, result) {
		    done();
		    pg.end();
		    res.send(allPosts({"messages" : result.rows}));
		});
	});
})

//write router
app.get('/newmessage',(req, res) => {
	res.send(writePosts());

});


app.post('/addmessage', function(req, res){
	console.log(req.body) 
	addMessage(req.body.title, req.body.body);
	res.redirect('/')
})


const listener = app.listen(80, () => {
    console.log('server has started at ', listener.address().port)
});
