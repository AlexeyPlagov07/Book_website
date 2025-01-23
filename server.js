var http = require('http');
var fs = require('fs');
var path = require('path');
var mysql = require('mysql');

// Create MySQL connection
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Ap45755!',
    database: 'test_database' // Make sure this is your actual database name
});

// Connect to the database
db.connect(function (err) {
    if (err) {
        console.error('Error connecting to the database: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL database');
});

// Create the server
http.createServer(function (req, res) {
    // Serve the HTML file
    if (req.url === '/') {
        fs.readFile(path.join(__dirname, 'demo.html'), function (err, data) {
            if (err) {
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end('Error loading demo.html');
            } else {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(data);
            }
        });
    }
    // Serve the CSS file
    else if (req.url === '/styles.css') {
        fs.readFile(path.join(__dirname, 'styles.css'), function (err, data) {
            if (err) {
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end('Error loading styles.css');
            } else {
                res.writeHead(200, {'Content-Type': 'text/css'});
                res.end(data);
            }
        });
    }
    // Serve the JavaScript file
    else if (req.url === '/script.js') {
        fs.readFile(path.join(__dirname, 'script.js'), function (err, data) {
            if (err) {
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end('Error loading script.js');
            } else {
                res.writeHead(200, {'Content-Type': 'application/javascript'});
                res.end(data);
            }
        });
    }
    // API endpoint to fetch data from MySQL
    else if (req.url === '/data') {
        var sql = 'SELECT name, author, img_url FROM books'; // Fetch name and author from books table
        db.query(sql, function (err, results) {
            if (err) {
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end('Error fetching data from the database');
                return;
            }
            // Send the fetched data as JSON
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(results));
        });
    }
    // Handle 404 for other routes
    else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('404 Not Found');
    }
}).listen(3000, function () {
    console.log('Server running at http://localhost:3000/');
});
