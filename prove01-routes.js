const fs = require('fs');
var username = [];
var i = 0;
var j = 0;
const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Assignment 1</title></head>');
    res.write(
      '<body><h1>Add a New User</h1>'
    );
    res.write(
      '<p>Welcome to prove assignment number one! Fill out the form to add a new user.</p>'
    );
    res.write('<form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Send</button></form>');
    res.write('<a href="http://localhost:3000/users"><button>Users Page</button></a>')
    res.write('</body>');
    res.write('</html>');
    return res.end();
  }
  if (url === '/users') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Assignment 1</title></head>');
    res.write('<body>');
    res.write('<h1>List of Users</h1>')
    res.write('<ul><li>User 1</li><li>User 2</li><li>User 3</li>');
    
    do {
      if (username.length > 0) {
        res.write('<li>' + username[j] + '</li>')
        j += 1;
      }
    } while (j < i)
    j = 0;
    res.write('</ul>');
    res.write('<a href="http://localhost:3000/"><button>Add User Page</button></a>')
    res.write('</body>')
    res.write('</html>');
    return res.end();
  }
  if (url === '/create-user') {
    const body = [];
    req.on('data', chunk => {
      body.push(chunk);
    });
    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody.split('=')[1]); // username=whatever-the-user-entered
      username[i] = parsedBody.split('=')[1];
      i += 1;
    });
    res.statusCode = 302;
    res.setHeader('Location', '/');
    return res.end();
  }

};

module.exports.handler = requestHandler;