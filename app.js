var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var Book =require('./book.model');
var db = mongoose.connect('mongodb://127.0.0.1:27017/example');


app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
extended:false	
}));




app.get('/',function(req,res){
	res.send('happ to be here');
}) ;
app.get('/books',function(req,res) {
console.log('getting all books');
Book.find({})
.exec(function(err,books){
	if (err) {
		res.send('errpr has occured');
	} else {
		res.json(books);
	}

})
});
app.get('/books/:id',function(req,res) {
	console.log('gettingone Book');
	Book.findOne({_id: req.params.id}).exec(function(err,books){
	if (err) {
		res.send('errpr has occured');
	} else {
		res.json(books);
	}

})
});

//post method
app.post('/books2',function(req,res) {
	var newBook = new Book();

	newBook.title = req.body.title;
	newBook.author = req.body.author;
	newBook.category = req.body.category;

	newBook.save(function(err,book) {
		if (err) {
			res.send('error saving book');
		} else {
			console.log(book);
			res.send(book);
		}

	});
});


app.get('/books/:id',function(req,res) {
	console.log('gettingone Book');
	Book.findOneAndUpdate({_id: req.params.id},
		{$set:{title:req.body.title}},
		{upsert:true},
		function(err,newBook) {
			if (err) {
				console.log('error occured');
			} else {
				console.log(newBook);
				res.status(204);
			}
		});
	});

var port = 8080;
app.listen(port ,function(){
	console.log("server started"+port);
})
