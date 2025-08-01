const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const DB_FILE = path.join(__dirname, 'db.txt');

// Utility: Read DB
function readDatabase() {
  if (!fs.existsSync(DB_FILE)) return [];
  const data = fs.readFileSync(DB_FILE, 'utf-8');
  return data ? JSON.parse(data) : [];
}

// Utility: Write DB
function writeDatabase(users) {
  fs.writeFileSync(DB_FILE, JSON.stringify(users, null, 2));
}

// CORS headers
const setCorsHeaders = (res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173'); // your frontend
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
};

// Server
const server = http.createServer((req, res) => {
  setCorsHeaders(res); // Always set CORS headers

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Handle POST request
  if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString(); // Buffer to string
    });

    req.on('end', () => {
      try {
        const data = JSON.parse(body);

        // SIGNUP
        if (req.url === '/signup') {
          const users = readDatabase();
          const exists = users.find(user =>
            user.email === data.email || user.username === data.username
          );

          if (exists) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, message: 'User already exists' }));
            return;
          }

          users.push({
            username: data.username,
            email: data.email,
            password: data.password
          });

          writeDatabase(users);

          res.writeHead(201, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true, message: 'Signup successful' }));
        }

        // LOGIN
        else if (req.url === '/login') {
          const users = readDatabase();

          const user = users.find(u =>
            (u.email === data.identifier || u.username === data.identifier) &&
            u.password === data.password
          );

          if (user) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true, message: 'Login successful' }));
          } else {
            res.writeHead(401, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, message: 'Invalid credentials' }));
          }
        }

        // Unknown POST route
        else {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Route not found' }));
        }
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: 'Invalid JSON' }));
      }
    });
  }

  // Other HTTP methods (GET, PUT, DELETE, etc.)
  else {
    res.writeHead(405, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Method not allowed' }));
  }
});

// Start server
server.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
