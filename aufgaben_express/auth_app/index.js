import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';

const app = express();
const port = 3005;
app.use(session({
    secret: 'supersecret',
      resave: false,
      saveUninitialized: true,
    cookie: {}
  }));

let names = ['Hans', 'Peter', 'Klaus', 'Dieter', 'Karl'];

app.use(bodyParser.text());

app.get('/', function (request, response, _) {
    
    request.session.views = (request.session.views || 0) + 1
    console.log(request.session)
  
    response.end(request.session.views + ' views')
  })

app.get('/name', (req, res) => {
  res.send(names);
});

app.post('/name', (req, res) => {
  names = [...names, req.body];
  res.send(names);
});

app.delete('/name/:name', (req, res) => {
    names = names.filter(name => name !== req.params.name);
    res.send(names);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});






