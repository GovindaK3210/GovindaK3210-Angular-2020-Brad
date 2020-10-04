const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

//Connect to database
mongoose.Promise = global.Promise;
mongoose.connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true }).then(
	() => {
		console.log('Database sucessfully connected: ' + config.database);
	},
	(error) => {
		console.log('Database could not connected: ' + error);
	}
);

const users = require('./routes/users');
const { dirname } = require('path');

//Configure server
const app = express();
const port = 3000;

//Front2Back Middleware
app.use(cors());

//Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

//BodyParser middleware
app.use(bodyParser.json());

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

//routes to /users
app.use('/users', users);

//Index route
app.get('/', (req, res) => {
	res.send('Invalid endpoint');
});

app.get('*', (req, res) => {
	res.sendFile(path.join(dirname, 'public/index.html'));
});

//Start server
app.listen(port, () => {
	console.log('Server started on port ' + port);
});
