var express = require('express');
var morgan = require('morgan');
var path = require('path');
var pool = require('pg').pool;
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
var articles = {
    'article-one' : {
	title: "Article | one",
	heading : " Hi",
	content: `The Black Cat' is a short story written by Edgar Allan Poe. Poe was born in 1809, died at the age of 40 in 1849, and was an important contributor to the American Romantic movement. His work has also been described as mystery, macabre, and Gothic.

In addition to writing short stories and poems, Poe also worked as a literary critic. He was married to his cousin for 12 years, until she died of tuberculosis in 1847. Throughout his life, Poe struggled with money. He couldn't afford to go to college, and he gambled and drank excessively.

Poe's short story, 'The Black Cat' was published in 1843 in The Saturday Evening Post. It was popular with readers, but Poe did not receive instant success until he published his famous poem, 'The Raven'. Since its publication, elements of 'The Black Cat' have inspired films, television episodes, paintings, plays, comics, and novels.`
},
    'article-two' : {
        title: "Article | two",
    	heading : " Hi",
	    content: `After the death of his father, T'Challa returns home to the African nation of Wakanda to take his rightful place as king. When a powerful enemy suddenly reappears, T'Challa's mettle as king -- and as Black Panther -- gets tested when he's drawn into a conflict that puts the fate of Wakanda and the entire world at risk. Faced with treachery and danger, the young king must rally his allies and release the full power of Black Panther to defeat his foes and secure the safety of his people.`
    },
};


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
    pool.query('SELECT * FROM test',function(err, result){
        if(err){
            res.status(500).send(err.toString());
        }else{
            res,send(JSON.stringify(result));
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


app.get("/:articleName", function(req, res){
    //articleName = url
    //articles[articleName] = article-one
    var articleName = req.params.articleName;
  res.send(createTemplate(articles[articleName]));
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
