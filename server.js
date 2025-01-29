var http = require('http');
var fs = require('fs');
var path = require('path');
var mysql = require('mysql');

// Create MySQL connection
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Ap45755!',
    database: 'test_database'
});

// Connect to the database
db.connect(function(err) {
    if (err) {
        console.error('Error connecting to the database: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL database');
});

// Create the server
http.createServer(function(req, res) {
    if (req.url === '/') {
        fs.readFile(path.join(__dirname, 'demo.html'), function(err, data) {
            if (err) {
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end('Error loading demo.html');
            } else {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(data);
            }
        });
    } else if (req.url === '/styles.css') {
        fs.readFile(path.join(__dirname, 'styles.css'), function(err, data) {
            if (err) {
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end('Error loading styles.css');
            } else {
                res.writeHead(200, {'Content-Type':'text/css'});
                res.end(data);
            }
        });
    
    } else if (req.url === '/data') { 
      var sql = 'SELECT name, author, img_url FROM books'; // Fetch name and author from books table 
      db.query(sql, function (err, results) { 
        if (err) { 
          res.writeHead(500, {'Content-Type': 'text/plain'}); 
          res.end('Error fetching data from the database'); return; 
        } // Send the fetched data as JSON 
        res.writeHead(200, {'Content-Type': 'application/json'}); 
        res.end(JSON.stringify(results)); 
      }); 
      

    } else if (req.url === '/info_styles.css') {
        fs.readFile(path.join(__dirname, 'info_styles.css'), function(err, data) {
            if (err) {
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end('Error loading info_styles.css');
            } else {
                res.writeHead(200, {'Content-Type':'text/css'});
                res.end(data);
            }
        });
    } else if (req.url === '/script.js') {
        fs.readFile(path.join(__dirname, 'script.js'), function(err, data) {
            if (err) {
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end('Error loading script.js');
            } else {
                res.writeHead(200, {'Content-Type':'application/javascript'});
                res.end(data);
            }
        });
    } else if (req.url.startsWith('/info?name=')) {
        const bookName = new URL(req.url, 'http://localhost').searchParams.get('name');

        if (bookName) {
            var sql = 'SELECT name, author, img_url,owner FROM books WHERE name = ?';
            db.query(sql, [bookName], function(err, results) {
                if (err) {
                    res.writeHead(500, {'Content-Type': 'text/plain'});
                    res.end('Error fetching book details from the database');
                    return;
                }

                if (results.length === 0) {
                    res.writeHead(404, {'Content-Type': 'text/plain'});
                    res.end('Book not found');
                    return;
                }

                const book = results[0];

                // Inject the fetched book data into the book_info.html file
                fs.readFile(path.join(__dirname, 'book_info.html'), 'utf-8', function(err, data) {
                    if (err) {
                        res.writeHead(500, {'Content-Type': 'text/plain'});
                        res.end('Error loading book_info.html');
                    } else {
                        // Use regex to replace all placeholders
                        data = data.replace(/BOOK_NAME/g, book.name);
                        data = data.replace(/BOOK_AUTHOR/g, book.author);
                        data = data.replace(/BOOK_DESCRIPTION/g, book.description);
                        data = data.replace(/BOOK_IMAGE_URL/g, book.img_url);
                        data = data.replace(/BOOK_OWNER/g, book.owner);
                        res.writeHead(200, {'Content-Type': 'text/html'});
                        res.end(data);
                    }
                });
            });
        } else {
            res.writeHead(400, {'Content-Type': 'text/plain'});
            res.end('Book name is required');
        }
    } else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('404 Not Found');
    }
}).listen(3000, function() {
    console.log('Server running at http://localhost:3000/');
});
