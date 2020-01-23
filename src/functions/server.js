const path = require('path');
const express = require('express');
const next = require('next');
const cookieParser = require('cookie-parser');

const authApi = require('./authApi');

const dev = process.env.NODE_ENV !== 'production';
const app = next({
	dev,
	conf: { distDir: `${path.relative(process.cwd(), __dirname)}/next` }
});

const handle = app.getRequestHandler();

// GAE passes the port the app will run on via process.env.PORT
const port = process.env.PORT || 5000;

const isLoggedIn = (req, res, next) => {
	if (typeof req.cookies.token !== 'undefined') {
		return res.redirect('/');
	}

	next();
};

const isNotLoggedIn = (req, res, next) => {
	if (typeof req.cookies.token === 'undefined' || !req.cookies.token) {
		return res.redirect('/login');
	}

	next();
};

app
	.prepare()
	.then(() => {
		const server = express();
		// Body parser
		server.use(express.json());
		// Cookie parser
		server.use(cookieParser());

		server.use('/api/auth', authApi);
		server.get('/', isNotLoggedIn);
		server.get('/login', isLoggedIn);
		server.get('*', handle);

		server.listen(port, err => {
			if (err) throw err;
			console.log(
				`> Ready on http://localhost:${port} NODE_ENV: ${process.env.NODE_ENV}`
			);
		});
	})
	.catch(ex => {
		console.error(ex.stack);
		console.error(ex);
		process.exit(1);
	});

module.exports = app;
