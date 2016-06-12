var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var mongoose = require('mongoose');

server.listen(3000, function(){
  console.log('listening on port:3000');
});

mongoose.connect('mongodb://localhost/sticks', function(err) {
	if (err) {
		console.log(err);
	} else {
		console.log('Connected to mongodb successful');
	}
});

var productSchema = mongoose.Schema({
		name: String,
		type: String,
		length: String,
		width: String,
		height: String,
		weight: String
});


var Product = mongoose.model('Product', productSchema);

app.get('/products', function (req, res) {
    Product.find({}, function (err, docs) {
        res.send(docs);
	});
});


app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

app.use(express.static(path.join(__dirname, 'public')));
