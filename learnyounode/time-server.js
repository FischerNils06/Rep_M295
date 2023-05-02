var net = require('net');
var date = new Date();
var year = date.getFullYear();
var month = date.getMonth()+1;
var day = date.getDate();
var hour = date.getHours();
var minute = date.getMinutes();

const server = net.createServer(function (socket) {
    socket.end(year + "-0" + month + "-0" + day + " " + hour + ":" + minute + "\n");
}
);

server.listen(process.argv[2]);

