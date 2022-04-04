let express = require('express');
let path = require('path');
let hbs = require('hbs');
let weather = require('./utility/weather');
let app = express();
let port = process.env.PORT || 3000;
// website
// will contain the following routes:
// app.com = home page
// app.con/help = help page
// app.com/about = about page

// app takes two arguments
// 1. route
// 2. function for when the route is accessed
	// a.rec = request = information about the incoming request to the server
	// b. res = response = information about the outgoing response from the server
	
// app.get('', (req, res) => {
	// // tell what happens when the route is accessed
// });

let publicDirectory = path.join(__dirname, '../public');
let viewsDirectory = path.join(__dirname, '../templates/views');
let partialsDirectory = path.join(__dirname, '../templates/partials');

//implement hbs by using app.set()

app.set('view engine', 'hbs');
app.set('views', viewsDirectory); // sets the path of the custom directory(templates folder)

hbs.registerPartials(partialsDirectory); // sets the path of the partials for hbs to use

//point to the publicDirectory where index .html is
app.use(express.static(publicDirectory));


// home route - / or ''
app.get('', (req, res) => {
	//res.send("<h1>Home Route</h1>");// // tell what happens when the home route is accessed
	res.render('index', 
		{
			title: 'Home Page',
			name: 'Chase Perry',
			course: 'CSC 174'
		}
	); //render the dynamic index template
});

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About Page',
		name: 'Chase Perry',
		course: 'CSC 174'
	});
 });

app.get('/help', (req, res) => {
		res.render('help', {
			title: 'Help Page',
			helpText: 'This is some helpful from the help page',
			name: 'Chase Perry',
			course: 'CSC 174'
		});
	});



app.get('/weather', (req, res) => {
	//res.send("Your have reached thet weather page");// tell what happens when the weather route is accessed
	
	if(!req.query.city)
	{
		res.send({
			error: 'You must provide a cirty!'
		});
	}
	else
	{
		//make a call to weather module
		weather(req.query.city, (error, weatherData) => {
			if(error)
				return res.send({error: error});
			else
			{
				res.send({weather: weatherData});
			}
		})
		
		// res.send({
			// forecast: "47 Degress and cloudy",
			// location: req.query.city
		// });
	}
});


//example
app.get('/products', (req, res) =>{
	if(!req.query.search)
	{
		res.send({
			error:'You must provide a search term'
		});
	}
	else
	{
		//console.log(req.query);
	res.send({
		products: []
	});
	}
});

app.get('/help/*', (req, res) => {
	//res.send("Help Article not found");
	res.render('4042', {
		error: "Page Not Found",
		errorType:"404 Help Article Error",
		
	})
});

app.get('*', (req, res) => {
	//res.send("404 Error Page Not Found");
	res.render('4041', {
		error: "Page Not Found",
		errorType:"404 Error"
	})
});





//use app.listen to start up the server
//takes at least 1 parameter = tells the port number where the application will be served
// port 3000 is a common deve port for local machines

//add afunction as an argument which can tell what happens when the server is loaded
app.listen(port, () =>{
	console.log('Server is live.');
	console.log('Open your web browser and go to the following URL. - localhost:3000');
	console.log('To exit, come back to node.js command prompt and enter CTRL+C');
});