var app = require('./lib/app.js')();
var PORT = 8080

console.log("Running @ http://localhost:"  + PORT + ". Press ^C to Terminate.");
app.listen(PORT);