var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var config = {
    user: 'papai983g',
    database: 'papai983g',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};
var app = express();
app.use(morgan('combined'));

//this line was modified by me



function createTemplate (data){
    var title = data.title;
    var content = data.content;
    //${} this line is used for use the variable content
    var htmlTemplate = `
    	<html>
    	<head>
    		<title>
    			${title}
    		</title>
    		<meta name="viewport" content="width-device-width, initial-scale=1">
    		<link href="/ui/style.css" rel="stylesheet" />
    	</head>
    	<body>
    		<div id="d1"> 
    			<font>  Welcome to this website </font>
    			<img src="https://static.pexels.com/photos/879788/pexels-photo-879788.jpeg" height="100%" width="40%" style="padding-left: 55%;">		
    		</div>
    		<div id="d2">
    			<ul>
    				<li>
    					Home
    				</li>	
    				<li>
    					Gallery 
    				</li>	
    				<li>
    					Contact Us
    				</li>	
    			</ul>
    		</div>
    		<div id="d3">
    			<div id="d4">
    				${content} 
    		</div>		
    		</div>
    	</body>
    </html>
    `;
    return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var pool = new Pool(config);
app.get('/test-db', function(req, res){
    //make a select request
    // return a responce
    pool.query('SELECT * FROM test', function (err, result){
        if(err){
            res.status(500).send(err.toString());
        }else{
            res.send(JSON.stringify(result.rows));
        }
    });
    
});

var counter =0;

app.get('/counter', function(req, res){
    counter = counter +1;
    res.send(counter.toString());
    
});

var names =[];
app.get('/submit-name', function(req, res){
    // get the name from the request
    var name = req.query.name;
    names.push(name);
    // JSON: JavaScript Object Notation
    res.send(JSON.stringify(names));
});


app.get("/articles/:articleName", function(req, res){
    //articleName = url
    //articles[articleName] = article-one
  
    
    pool.query("SELECT * FROM article WHERE title= $1",[req.params.articleName], function(err, result){
        if(err){
            res.status(500).send(err.toString());
        }else{
            if(result.rows.length ===0){
                res.status(404).send('Article not found');
            }else{
                var articleData = result.rows[0];
                res.send(createTemplate(articleData));
            }
        }
    });
  
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
