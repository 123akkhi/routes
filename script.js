const http = require('http');
const express = require('express');
const app =express();

app.use((req,res,next) =>{
  console.log('in the middleware');
  next();
});
app.use((req,res,next) =>{
  console.log('in another  middleware');
  next();
});
res.send('<h1>Hello From Express!<h1/>')

const server= http.createServer((app) => {
  const url  = req.url;
  
  const method = req.method;
  if (url === '/') {
    res.write('<html>');
    res.write('<head><title>Enter Message</title></head>');
    res.write('<body>');
    res.write('<h2>Enter your message:</h2>');
    res.write('<form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form>');
    res.write('<h2>Messages:</h2>');
    // read messages from file and display
    const messages = fs.readFileSync('messages.txt', 'utf-8').split('\n');
    for (const message of messages) {
      if (message.trim() !== '') {
        res.write(`<p>${message}</p>`);
      }
    }
    res.write('</body>');
    res.write('</html>');
    return res.end();
  }
  if (url === '/message' && method === 'POST') {
    const body = [];
    req.on('data', (chunk) => {
      console.log(chunk);
      body.push(chunk);
      
    });
   return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];
      fs.appendFileSync('messages.txt', message + '\n');
      res.statusCode = 302;
      res.setHeader('Location', '/');
      return res.end();
    });    
  }
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>My First Page</title></head>');
  res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
  res.write('</html>');
  res.end();
});

server.listen(3000);