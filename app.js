/* HomIOT Server
 Allows to get and analyze data being sent from HomIOT.Arduino hardware
 Data is available over websocket to HomIOT.Mobile
 Created Dec 13/2014 by Vlad Kosarev
 Source: https://github.com/vladkosarev/HomIOT.Server
 */

var express = require('express');
var bodyParser = require('body-parser');
var _ = require('lodash');

var app = express();
app.use(bodyParser.json());

// Definition of all sensors. You can comment out any that you don't use and they will be ignored.
var sensors = [
    {
        id: "P2", // pin number on arduino
        name: "Test Sensor 2", // name of sensor
        0: "Test Sensor 2 is OFF", // what to display on pin being 0
        1: "Test Sensor 2 is ON", // what to display on pin being 1
        currentValue: 0 // current value of the pin
    },
    {
        id: "P3",
        name: "Test Sensor 3",
        0: "Test Sensor 3 is OFF",
        1: "Test Sensor 3 is ON",
        currentValue: 0
    },
    {
        id: "P4",
        name: "Fireplace Room Window",
        0: "Fireplace Room Window is OPENED",
        1: "Fireplace Room Window is CLOSED",
        currentValue: 1
    },
    {
        id: "P5",
        name: "TV Room Window",
        0: "TV Room Window is OPENED",
        1: "TV Room Window is CLOSED",
        currentValue: 1
    },
    {
        id: "P6",
        name: "Washroom Window",
        0: "Washroom Window is OPENED",
        1: "Washroom Window is CLOSED",
        currentValue: 1
    },
    {
        id: "P7",
        name: "Test Sensor 7",
        0: "Test Sensor 7 is OFF",
        1: "Test Sensor 7 is ON",
        currentValue: 0
    },
    {
        id: "P8",
        name: "Back Door",
        0: "Back Door is OPENED",
        1: "Back Door is CLOSED",
        currentValue: 1
    },
    {
        id: "P9",
        name: "Test Sensor 9",
        0: "Test Sensor 9 is OFF",
        1: "Test Sensor 9 is ON",
        currentValue: 0
    },
    {
        id: "10",
        name: "Test Sensor 9",
        0: "Test Sensor 9 is OFF",
        1: "Test Sensor 9 is ON",
        currentValue: 0
    },
    {
        id: "11",
        name: "Test Sensor 9",
        0: "Test Sensor 9 is OFF",
        1: "Test Sensor 9 is ON",
        currentValue: 0
    },
    {
        id: "12",
        name: "Test Sensor 12",
        0: "Test Sensor 12 is OFF",
        1: "Test Sensor 12 is ON",
        currentValue: 0
    }
];

app.post('/', function (req, res) {
    var data = req.body;
    for (var pin in data) {
        var sensor = _.findWhere(sensors, {id: pin});
        if (sensor) {
            sensor.currentValue = data[pin];
            io.emit('data', sensor[sensor.currentValue]);
            console.log(sensor[sensor.currentValue]);
        }
    }
    res.sendStatus(200);
});

var server = app.listen(9999, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Listening at http://%s:%s', host, port)
});

var io = require('socket.io').listen(server);
io.set('origins', '*:*');
io.on('connection', function (socket) {
    console.log('user connected');

    for (var counter in sensors) {
        var sensor = sensors[counter];
        io.emit('data', sensor[sensor.currentValue]);
    }
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});