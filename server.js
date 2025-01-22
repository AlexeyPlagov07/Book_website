var http = require('http');
var fs = require('fs');
var path = require('path');

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
    // Handle 404 for other routes
    else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('404 Not Found');
    }
}).listen(3000, function() {
    console.log('Server running at http://localhost:3000/');
});
