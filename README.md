# pirest

![pirest board](https://github.com/jgrecoarroyo/pirest.web/blob/gh-pages/img/pi3big.png)

## Usage
### Why
We love to prototype, innovate and experiment. It doesn't matter if it is a professional application or a hobby-like project, implementation can be a great hassle. With πrest you will focus on what really matters: the development of your idea and avoid getting stuck in the process.

> **How to use πrest**
   1. Check wether your analog or digital signals are giving the correct values in real time! 
>   2. Stream the correct verified data using simple REST API calls. 
>   3. Enjoy prototyping! :)

### Installation
Clone the project from github using the following command:

```
sudo node gpioapp/rpi-server-gpio/myapi.js
```
or download the zip file from [here](https://github.com/jgrecoarroyo/rpi/archive/master.zip)

Next run the node.js server, to start the REST API server with the GPIOs:

```
node gpioapp/rpi-server-gpio/myapi.js
```
Once that is up and running you can already try the visual debugging tool by launching at `http://your_raspberryPi_ip:3000` your web browser.


Finally, in order to see the ADCPi shield channels, run the python server to expose those values running the following command:

```
sudo python ADCPi/pyServer.py
```

> **sudo privileges**
> You'll need sudo privileges to execute the python server. This will work only internally and only exposed via the node.js REST API. If this is not running, the rest of the GPIO functionality will still work.


##REST API
###GPIOs
If no gpio number is specified `http://MyRPiIP:3000/gpios/` a whole list of values will be returned in JSON format.

```json
[
  {
    "pin":  "7",
    "gpio":  "4",
    "value":  "1"
  },
  {
    "pin":  "11",
    "gpio":  "17",
    "value":  "0"
  },
  ...
]
```

When a gpio number is given, for example `4` i.e. `http://MyRPiIP:3000/gpios/4` a just that value will be returned in JSON format.

```json
{
    "pin":  "7",
    "gpio":  "4",
    "value":  "1"
}
```

###PINs
In the same way as with GPIOs, you can call these by their pin number http://MyRPiIP:3000/api/pins/7, or none specifiying the pin number http://MyRPiIP:3000/pins to get all values.

###ADCs
> **ADCPi shield**
> The raspberry pi doesn't have ADCs (Analog to Digital Converters) by default, and for that reason an external shield is needed to be able to read analog sensors. The ADC values are given in Volts provided by the 8-channel ["ADB Pi Plus"](https://www.abelectronics.co.uk/products/17/Raspberry-Pi/56/ADC-Pi-Plus---Raspberry-Pi-Analogue-to-Digital-converter) board with a 17bit resolution 0-5V (using two Microchip MCP3424 A/D converters).

In the same way as with PIN numbers or GPIO numbers, you will be able to access the 8 ADC channels using `http://MyRPiIP:3000/adcs` and a whole list of values will be returned in JSON format.

```json
[
  {
    "channel": "1",
    "value":  "3.11346"
  },
  {
    "channel":  "2",
    "value":  "0.0"
  },
  ...
  {
    "channel":  "8",
    "value":  "0.0"
  }
]
```

Or, given a scpecific ADC number, you can get only that specific ADC channel. For example given ADC number `1` we call `http://MyRPiIP:3000/adcs/1` the following will be returned:

```json
{
    "channel": "1",
    "value":  "3.11346"
}
```
