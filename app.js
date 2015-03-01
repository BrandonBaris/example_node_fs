var fs = require('fs');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var SAVE_DIR = 'saved_files/';

app.set( 'view engine', 'jade' );
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/new_file', function (req, res) {
  res.render('new_file');
});

// ------
app.post('/create_file', function (req, res) {
  var file_name = req.body.file_name;
  var file_content = req.body.file_content;

  fs.writeFile( SAVE_DIR + file_name, file_content, function (err) {
    if (err) throw err;

    console.log('saved file:', file_name);
    res.redirect('/files');

  });
});

// ------
app.get('/files', function (req, res) {
  fs.readdir( SAVE_DIR, function (err, files) {
    if (err) throw err;

    res.render('files', { files : files });

  });
});

// ------
app.get('/file/:name', function (req, res) {
  var file_name = req.params.name;

  fs.readFile( SAVE_DIR + file_name, function (err, data) {
  if (err) throw err;
  // res.send( data );
  res.render("file", {file_name : file_name, content : data });
  });
});

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});