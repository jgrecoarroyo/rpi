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
var request   = require('request');

var app       = express();

// input port objects for our example
var inputs = [    { pin: '7', gpio: '4', value: null },
                  { pin: '11', gpio: '17', value: null },
                  { pin: '12', gpio: '1', value: null },
                  { pin: '13', gpio: '27', value: null },
                  { pin: '15', gpio: '22', value: null },
                  { pin: '16', gpio: '23', value: null },
                  { pin: '18', gpio: '24', value: null },
                  { pin: '22', gpio: '25', value: null },
                  { pin: '29', gpio: '5', value: null },
                  { pin: '31', gpio: '6', value: null },
                  { pin: '32', gpio: '12', value: null },
                  { pin: '33', gpio: '13', value: null },
                  { pin: '35', gpio: '19', value: null },
                  { pin: '36', gpio: '16', value: null },
                  { pin: '37', gpio: '26', value: null },
                  { pin: '38', gpio: '20', value: null },
                  { pin: '40', gpio: '21', value: null }
                ];

// -----------------------------------------------------------------------
// open GPIO ports
var i;
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
// (note: the gpio.read cannot be for-looped)
setInterval( function () {
  gpio.read(inputs[0].pin, function (err, value) {
    if (err) {
      throw err;
    }
    console.log('read pin ' + inputs[0].pin + ' value = ' + value);
    // update the inputs object
    inputs[0].value = value.toString(); // store value as a string
  });
  gpio.read(inputs[1].pin, function (err, value) {
    if (err) {
      throw err;
    }
    console.log('read pin ' + inputs[1].pin + ' value = ' + value);
    inputs[1].value = value.toString();
  });
  gpio.read(inputs[2].pin, function (err, value) {
    if (err) {
      throw err;
    }
    console.log('read pin ' + inputs[2].pin + ' value = ' + value);
    inputs[2].value = value.toString();
  });
  gpio.read(inputs[3].pin, function (err, value) {
    if (err) {
      throw err;
    }
    console.log('read pin ' + inputs[3].pin + ' value = ' + value);
    inputs[3].value = value.toString();
  });
  gpio.read(inputs[4].pin, function (err, value) {
    if (err) {
      throw err;
    }
    console.log('read pin ' + inputs[4].pin + ' value = ' + value);
    inputs[4].value = value.toString();
  });
  gpio.read(inputs[5].pin, function (err, value) {
    if (err) {
      throw err;
    }
    console.log('read pin ' + inputs[5].pin + ' value = ' + value);
    inputs[5].value = value.toString();
  });
  gpio.read(inputs[6].pin, function (err, value) {
    if (err) {
      throw err;
    }
    console.log('read pin ' + inputs[6].pin + ' value = ' + value);
    inputs[6].value = value.toString();
  });
  gpio.read(inputs[7].pin, function (err, value) {
    if (err) {
      throw err;
    }
    console.log('read pin ' + inputs[7].pin + ' value = ' + value);
    inputs[7].value = value.toString();
  });
  gpio.read(inputs[8].pin, function (err, value) {
    if (err) {
      throw err;
    }
    console.log('read pin ' + inputs[8].pin + ' value = ' + value);
    inputs[8].value = value.toString();
  });
  gpio.read(inputs[9].pin, function (err, value) {
    if (err) {
      throw err;
    }
    console.log('read pin ' + inputs[9].pin + ' value = ' + value);
    inputs[9].value = value.toString();
  });
  gpio.read(inputs[10].pin, function (err, value) {
    if (err) {
      throw err;
    }
    console.log('read pin ' + inputs[10].pin + ' value = ' + value);
    inputs[10].value = value.toString();
  });
  gpio.read(inputs[11].pin, function (err, value) {
    if (err) {
      throw err;
    }
    console.log('read pin ' + inputs[11].pin + ' value = ' + value);
    inputs[11].value = value.toString();
  });
  gpio.read(inputs[12].pin, function (err, value) {
    if (err) {
      throw err;
    }
    console.log('read pin ' + inputs[12].pin + ' value = ' + value);
    inputs[12].value = value.toString();
  });
  gpio.read(inputs[13].pin, function (err, value) {
    if (err) {
      throw err;
    }
    console.log('read pin ' + inputs[13].pin + ' value = ' + value);
    inputs[13].value = value.toString();
  });
  gpio.read(inputs[14].pin, function (err, value) {
    if (err) {
      throw err;
    }
    console.log('read pin ' + inputs[14].pin + ' value = ' + value);
    inputs[14].value = value.toString();
  });
  gpio.read(inputs[15].pin, function (err, value) {
    if (err) {
      throw err;
    }
    console.log('read pin ' + inputs[15].pin + ' value = ' + value);
    inputs[15].value = value.toString();
  });
  gpio.read(inputs[16].pin, function (err, value) {
    if (err) {
      throw err;
    }
    console.log('read pin ' + inputs[16].pin + ' value = ' + value);
    inputs[16].value = value.toString();
  });

}, 500); // setInterval

// ------------------------------------------------------------------------
// configure Express to serve index.html and any other static pages stored
// in the home directory
app.use(express.static(__dirname));

// Express route for incoming requests for a single input
app.get('/gpios/:id', function (req, res) {
  var i;

 // console.log('received API request for port number ' + req.params.id);

  for (i in inputs){
    if ((req.params.id === inputs[i].gpio)) {
      // send to client an inputs object as a JSON string
      res.send(inputs[i]);
      return;
    }
  } // for

  console.log('invalid input port');
  res.status(403).send('dont recognise that input port number ' + req.params.id + ' gpios numbers ports used!');
}); // apt.get()

// Express route for incoming requests for a list of all inputs
app.get('/gpios', function (req, res) {
  // send array of inputs objects as a JSON string
  console.log('all inputs');
  res.status(200).send(inputs);
}); // apt.get()

// Express route for incoming requests for a single input
app.get('/pins/:id', function (req, res) {
  var i;

 // console.log('received API request for port number ' + req.params.id);

  for (i in inputs){
    if ((req.params.id === inputs[i].pin)) {
      // send to client an inputs object as a JSON string
      res.send(inputs[i]);
      return;
    }
  } // for

  console.log('invalid input port');
  res.status(403).send('dont recognise that input port number ' + req.params.id + ' gpios numbers ports used!');
}); // apt.get()

// Express route for incoming requests for a list of all inputs
app.get('/pins', function (req, res) {
  // send array of inputs objects as a JSON string
  console.log('all pin inputs');
  res.status(200).send(inputs);
}); // apt.get()

// Express route for incoming requests for a list of all adcs inputs
app.get('/adcs', function (req, res) {
  // First get values from internal server (python server exposing ADC values)
  url = 'http://localhost:8003/adcs';
  console.log('making API call ' + url);
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var info = JSON.parse(response.body)
      console.log(info);
      res.status(200).send(info);
    }
  });
}); // apt.get()

// Express route for incoming requests for a single input
app.get('/adcs/:id', function (req, res) {
  url = 'http://localhost:8003/adcs';
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var info = JSON.parse(response.body)
      //console.log(info);
      //res.status(200).send(info);

      var i;

      // console.log('received API request for port number ' + req.params.id);

       for (i in info){
         if ((req.params.id === info[i].channel)) {
           // send to client an inputs object as a JSON string
           res.send(info[i]);
           return;
         }
       } // for

       console.log('invalid input port');
       res.status(403).send('dont recognise that input channel number ' + req.params.id + ', numbers 1 to 8 used!');

    }
  });


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
