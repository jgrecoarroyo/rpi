/**
 * MYCLIENT.JS
 * an example web app using an ajax request to our API server which returns a JSON object
 *
 * When a user opens index.html it then loads and executes this JavaScript code, which reads
 * the current logic level on the input ports, and displays that in the window, each in a div
 * identified by the index "inputs_[port number]"
 */

window.onload = function () {
  var url,
    i;
  var ports_right = [12, 16, 22, 32, 38, 40   ];  // the GPIO ports we will read
  var ports_left =  [7, 11, 13, 15, 29, 31, 33, 37];  // the GPIO ports we will read

  for (i in ports_right) {
    $('#input_' + ports_right[i]).html('loading port ' + ports_right[i] + ' value...');
  }
  for (i in ports_left) {
    $('#input_' + ports_left[i]).html('loading port ' + ports_left[i] + ' value...');
  }
  //document.domain = 'localhost';

  //var svg = document.getElementById('svg_object').contentDocument;
  //var svgel = svg.getElementById('01');
  //console.log(svg);

  var a = document.getElementById("svg_object");
  //it's important to add an load event listener to the object, as it will load the svg doc asynchronously
  /*
  a.addEventListener("load",function(){
     var svgDoc = a.contentDocument; //get the inner DOM of alpha.svg
     console.log("-----");
     console.log(a);
     console.log("-----");
     var delta = svgDoc.getElementById("PIN"); //get the inner element by id
     delta.addEventListener("mousedown",function(){alert('hello world!')},false);    //add behaviour
  },false);
  */
  //console.log("-----");
  //var svgDoc = a.contentDocument.getElementById("_1").childNodes;
  //svgDoc[1].textContent = '0';
  //console.log("-----");


  setInterval( function () {
    for (i in ports_left) {
      url = document.URL + 'pins/' + ports_left[i];
      console.log('making API call ' + url);

      $.getJSON(url, function (data) {
        console.log('API response received. port ' + data.pin + ' value = ' + data.value);
        var svgDoc = a.contentDocument.getElementById("_"+data.pin).childNodes;
        svgDoc[1].textContent = data.value;
        $('#input_' + data.pin).html('PIN input port ' + data.pin + ' value is ' + data.value);
      });
    } // for

    for (i in ports_right) {
      url = document.URL + 'pins/' + ports_right[i];
      console.log('making API call ' + url);

      $.getJSON(url, function (data) {
        console.log('API response received. port ' + data.pin + ' value = ' + data.value);
        var svgDoc = a.contentDocument.getElementById("_"+data.pin).childNodes;
        svgDoc[1].textContent = data.value;
        $('#input_' + data.pin).html('PIN input port ' + data.pin + ' value is ' + data.value);
      });
    } // for
  }, 1000); // setInterval


}; //onload
