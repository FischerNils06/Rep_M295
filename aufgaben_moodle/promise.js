var fs = require('fs');
const filepath = 'promise.txt';

leseDateiInhalt(filepath)
  .then(length => {
    console.log('Die Länge des Dateiinhalts beträgt:', length);
  })
  .catch(err => {
    console.error('Fehler beim Lesen der Datei:', err);
  });


function leseDateiInhalt (filepath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filepath, function(err, contents) {
            if (err) {
                reject(err);
            }
            var content = contents.toString();
            console.log(content);
            var length = content.length;
            resolve(length);
           
        }
        
        );
        
    });
}

