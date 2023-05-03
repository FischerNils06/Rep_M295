import express from 'express'
import path from 'path'
import cors from 'cors'
import multer from 'multer';
import fetch from 'node-fetch';
const app = express()
const port = 3001
const __dirname = path.resolve();
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Startseite
app.get('/', (request, response) => {
    response.send('!')
  })
// Zeitzone
function time(tz) {
    var date = new Date();
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
    hour = hour + tz;
    if (hour > 23) {
        hour = hour - 24;
    }
    if (hour < 0) {
        hour = hour + 24;
    }

    return hour + ":" + min + ":" + sec;
    
}

app.get('/now', (request, response) => {
    response.send(time(2))
    })

//Namenseiten
let names = ['Max', 'Emma', 'Sophie', 'Lena', 'Hannah', 'Noah', 'Liam', 'Ethan', 'Olivia', 'Ava', 'Mia', 'Isabella', 'Charlotte', 'Amelia', 'Harper', 'Evelyn', 'Abigail', 'Emily', 'Elizabeth', 'Sofia'];
  
app.get('/name', (request, response) => {
  response.sendFile(__dirname + '/form.html');
});
  
  app.post('/name', (request, response) => {
    const name = request.body.name;
    names.push(name);
  });
  
  app.delete('/name',multer().none(), (request, response) => {
    const namedelete = request.body.namedelete;
    for (var i = 0; i < names.length; i++) {
        if (names[i] === namedelete) {
            names.splice(i, 1);
        }
    }
    response.sendStatus(204);
  });

  app.get('/names', (request, response) => {
    response.json(names);
  });

  //Headers und Secret2

  app.get('/secret2', (request, response) => {
    if (request.headers.authorization === 'Basic aGFja2VyOjEyMzQ=') {
      response.sendStatus(200);
    }
    else {
      response.sendStatus(401);
    }
    console.log(request.headers.authorization)
  });

  // Chuck Norris API
  app.get('/chuck', (request, response) => {
    const name = request.query.name || 'Chuck Norris';
  
    fetch('https://api.chucknorris.io/jokes/random')
      .then(res => res.json())
      .then(json => {
        const joke = json.value.replace(/Chuck Norris/gi, name); 
        response.json(joke);
      })
      .catch(err => console.log(err));
  });




  



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


