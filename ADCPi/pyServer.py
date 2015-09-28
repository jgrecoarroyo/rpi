#!/usr/bin/env python
from BaseHTTPServer import HTTPServer
from BaseHTTPServer import BaseHTTPRequestHandler
import cgi

# ADC libraries
from ABE_ADCPi import ADCPi
from ABE_helpers import ABEHelpers
import time, os
# Initialise ADC connections
i2c_helper = ABEHelpers()
bus = i2c_helper.get_smbus()
adc = ADCPi(bus, 0x68, 0x69, 12)


PORT = 8003
FILE_PREFIX = "."

if __name__ == "__main__":
    try:
        import argparse

        parser = argparse.ArgumentParser(description='A simple fake server for testing your API client.')
        parser.add_argument('-p', '--port', type=int, dest="PORT",
                           help='the port to run the server on; defaults to 8003')
        parser.add_argument('--path', type=str, dest="PATH",
                           help='the folder to find the json files')

        args = parser.parse_args()

        if args.PORT:
            PORT = args.PORT
        if args.PATH:
            FILE_PREFIX = args.PATH

    except Exception:
        # Could not successfully import argparse or something
        pass


class JSONRequestHandler (BaseHTTPRequestHandler):

    def do_GET(self):

        #send response code:
        self.send_response(200)
        #send headers:
        self.send_header("Content-type", "application/json")
        # send a blank line to end headers:
        self.wfile.write("\n")

        try:

            if self.path[1:] == "adcs":
                # print self.path[1:]
                output_header = "["
                output_footer = "]"
                output_temp = ""
                for adc_pin in range(1, 9):
                    # { pin: '7', gpio: '4', value: null },
                    # output_temp = output_temp +  "{'adc':'" + str(adc_pin) + "','value':'" + str(adc.read_voltage(adc_pin)) + "'},"
                    if adc_pin < 8:
                        output_temp = output_temp +  '{"channel":"' + str(adc_pin) + '","value":"' + str(adc.read_voltage(adc_pin)) + '"},'
                    else:
                        output_temp = output_temp +  '{"channel":"' + str(adc_pin) + '","value":"' + str(adc.read_voltage(adc_pin)) + '"}'
                output = output_header + output_temp + output_footer
            else:
                output = open(FILE_PREFIX + "/" + self.path[1:] + ".json", 'r').read()
        except Exception:
            output = "{'error': 'Could not find file " + self.path[1:] + ".json'" + "}"
        self.wfile.write(output)

    def do_POST(self):
        if self.path == "/success":
            response_code = 200
        elif self.path == "/error":
            response_code = 500
        else:
            try:
                response_code = int(self.path[1:])
            except Exception:
                response_code = 201

        try:
            self.send_response(response_code)
            self.wfile.write('Content-Type: application/json\n')
            self.wfile.write('Client: %s\n' % str(self.client_address))
            self.wfile.write('User-agent: %s\n' % str(self.headers['user-agent']))
            self.wfile.write('Path: %s\n' % self.path)

            self.end_headers()


            form = cgi.FieldStorage(
                    fp=self.rfile,
                    headers=self.headers,
                    environ={'REQUEST_METHOD':'POST',
                                     'CONTENT_TYPE':self.headers['Content-Type'],
                                     })

            self.wfile.write('{\n')
            first_key=True
            for field in form.keys():
                    if not first_key:
                        self.wfile.write(',\n')
                    else:
                        self.wfile.write('\n')
                        first_key=False
                    self.wfile.write('"%s":"%s"' % (field, form[field].value))
            self.wfile.write('\n}')

        except Exception as e:
            self.send_response(500)


server = HTTPServer(("127.0.0.1", PORT), JSONRequestHandler)
server.serve_forever()
