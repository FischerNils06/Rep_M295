var http = require('http');

var urls = process.argv.slice(2);
var results = [];
var count = 0;

function printResults() {
    for (var i = 0; i < 3; i++) {
        var result = results[i].replace(/\n/g, ' ');
        console.log(result.substring(0, 100)+'...');
  
    }
}

function httpGet(index) {
    http.get(urls[index], function(response) {
        var result = '';
        response.setEncoding('utf8');
        response.on('data', function(data) {
            result += data;
        });
        response.on('end', function() {
            results[index] = result;
            count++;
            if (count === 3) {
                printResults();
            }
        });
    });
}

for (var i = 0; i < 3; i++) {
    httpGet(i);
}


