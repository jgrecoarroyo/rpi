/**
 * myapi.js
 * 
 * @version 1.1 - April 2015
 *
 * 
 * DESCRIPTION:
 * an application to demonstrate running a node 
 * API Appserver on a Raspberry Pi to access GPIO I/O
 * Uses the Express and wiringPi node packages. 
 * 
 * 
 * @throws none
 * @see nodejs.org
 * @see express.org
 * 
 * @author Ceeb
 * (C) 2015 PINK PELICAN NZ LTD
 */

var http      = require('http');
var express   = require('express');
var gpio      = require('pi-gpio');

var app       = express();

// input port objects for our example
var inputs2 = [
               { pin: '16', gpio: '23', value:null },
               { pin: '22', gpio: '25', value:null }
             ];
var inputs = [    { pin: '3', gpio: '2', value: null },
                  { pin: '5', gpio: '3', value: null },
                  { pin: '7', gpio: '4', value: null },
                  { pin: '8', gpio: '14', value: null },
                  { pin: '10', gpio: '15', value: null },
                  { pin: '11', gpio: '17', value: null },
                  { pin: '12', gpio: '18', value: null },
                  { pin: '13', gpio: '27', value: null },
                  { pin: '15', gpio: '22', value: null },
                  { pin: '16', gpio: '23', value: null },
                  { pin: '18', gpio: '24', value: null },
                  { pin: '19', gpio: '10', value: null },
                  { pin: '21', gpio: '9', value: null },
                  { pin: '22', gpio: '25', value: null },
                  { pin: '23', gpio: '11', value: null },
                  { pin: '24', gpio: '8', value: null },
                  { pin: '26', gpio: '7', value: null },
                  //{ pin: '27', gpio: '0', value: null },
                  //{ pin: '28', gpio: '1', value: null },
                  { pin: '29', gpio: '5', value: null },
                  { pin: '31', gpio: '6', value: null },
                  { pin: '32', gpio: '12', value: null },
                  { pin: '33', gpio: '13', value: null },
                  { pin: '35', gpio: '19', value: null },
                  //{ pin: '36', gpio: '16', value: null },
                  //{ pin: '37', gpio: '26', value: null },
                  //{ pin: '38', gpio: '20', value: null },
                  //{ pin: '40', gpio: '21', value: null }
                ];

// -----------------------------------------------------------------------
// open GPIO ports
var i;
//for (i in inputs) {
//  gpio.close(inputs[i].pin);
//}
for (i in inputs) {
  console.log('opening GPIO port ' + inputs[i].gpio + ' on pin ' + inputs[i].pin + ' as input');
  gpio.open(inputs[i].pin, "input", function (err) {
    if (err) {
      throw err;
    }
  }); // gpio.open
} // if

// ------------------------------------------------------------------------
// read and store the GPIO inputs twice a second
setInterval( function () {
/*  
  var j;
  for(j in inputs){
  gpio.read(inputs[j].pin, function (err, value) {
    if (err) { throw err; }
    inputs[j].value = value.toString(); // store value as a string
  });
  }
*/
  
  gpio.read(inputs[1].pin, function (err, value) {
    if (err) { throw err; }
    inputs[1].value = value.toString(); // store value as a string
  });
  gpio.read(inputs[2].pin, function (err, value) {
    if (err) { throw err; }
    inputs[2].value = value.toString(); // store value as a string
  });
  gpio.read(inputs[3].pin, function (err, value) {
    if (err) { throw err; }
    inputs[3].value = value.toString(); // store value as a string
  });
  gpio.read(inputs[14].pin, function (err, value) {
    if (err) { throw err; }
    inputs[14].value = value.toString(); // store value as a string
  });
  
/*
  gpio.read(inputs[1].pin, function (err, value) {
    if (err) {
      throw err;
    }
    console.log('read pin ' + inputs[1].pin + ' value = ' + value);
    inputs[1].value = value.toString();
  });
*/
  
}, 500); // setInterval

// ------------------------------------------------------------------------
// configure Express to serve index.html and any other static pages stored 
// in the home directory
app.use(express.static(__dirname));

// Express route for incoming requests for a single input
app.get('/inputs/:id', function (req, res) {
  var i;

  console.log('received API request for port number ' + req.params.id);
  
  for (i in inputs){
    if ((req.params.id === inputs[i].gpio)) {
      // send to client an inputs object as a JSON string
      res.send(inputs[i]);
      return;
    }
  } // for

  console.log('invalid input port');
  res.status(403).send('dont recognise that input port number ' + req.params.id);
}); // apt.get()

// Express route for incoming requests for a list of all inputs
app.get('/inputs', function (req, res) {
  // send array of inputs objects as a JSON string
  console.log('all inputs');
  res.status(200).send(inputs);
}); // apt.get()

// Express route for any other unrecognised incoming requests
app.get('*', function (req, res) {
  res.status(404).send('Unrecognised API call');
});

// Express route to handle errors
app.use(function (err, req, res, next) {
  if (req.xhr) {
    res.status(500).send('Oops, Something went wrong!');
  } else {
    next(err);
  }
}); // apt.use()

process.on('SIGINT', function() {
  var i;

  console.log("\nGracefully shutting down from SIGINT (Ctrl+C)");

  console.log("closing GPIO...");
  for (i in inputs) {
    gpio.close(inputs[i].pin);
  }
  process.exit();
});

// ------------------------------------------------------------------------
// Start Express App Server
//
app.listen(3000);
console.log('App Server is listening on port 3000');

