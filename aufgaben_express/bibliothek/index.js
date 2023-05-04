import express from 'express';

//Allgemeines
const app = express();
const port = 3003;
app.use(express.json());

//Startseite
app.get('/', (request, response) => {
    response.status(404).send('Seite nicht Verfügbar! Versuchen Sie es mit http://localhost:3003/books');
});


// Bücherliste
let books = [
    {isbn : "1", title : "Harry Potter", author : "J.K. Rowling", year : 1997},
    {isbn : "2", title : "Herr der Ringe", author : "J.R.R. Tolkien", year : 1954},
    {isbn : "3", title : "Der kleine Prinz", author : "Antoine de Saint-Exupéry", year : 1943},
    {isbn : "4", title : "Der Alchimist", author : "Paulo Coelho", year : 1988},
    {isbn : "5", title : "Der Name der Rose", author : "Umberto Eco", year : 1980},
    {isbn : "6", title : "Der Herr der Fliegen", author : "William Golding", year : 1954},
    {isbn : "7", title : "Der Fänger im Roggen", author : "J.D. Salinger", year : 1951},
    {isbn : "8", title : "Der kleine Hobbit", author : "J.R.R. Tolkien", year : 1937},
    {isbn : "9", title : "Die unendliche Geschichte", author : "Michael Ende", year : 1979},
    {isbn : "10", title : "Die Säulen der Erde", author : "Ken Follett", year : 1989},
    {isbn : "11", title : "Die Verwandlung", author : "Franz Kafka", year : 1915},
    {isbn : "12", title : "Die Schatzinsel", author : "Robert Louis Stevenson", year : 1883},
    ]
    
//Books Seite
app.get('/books', (request, response) => {
    response.json(books);
});

app.get('/books/:isbn', (request, response) => {
  const isbn = request.params.isbn;
  let book = books.find(book => book.isbn === isbn);
  if (book) {
    response.json(book);
  }
  else {
    response.status(404).send('Book not found');
  }
});

app.post('/books', (request, response) => {
  const book = request.body;
  insert(book);
  response.sendStatus(201);
});


app.put('/books/:isbn', (request, response) => {
  const isbn = request.params.isbn;
  const book = books.find((book) => book.isbn === isbn);
  if (book) {
    replace(book, request.body);
    response.sendStatus(200);
  } else {
    response.sendStatus(404);
  }
});


app.delete('/books/:isbn', (request, response) => {
  const isbn = request.params.isbn;
  remove(isbn)
  response.sendStatus(204);
});

function insert(book) {
  books = [...books, book];

}

function replace(book, newBookData) {
  const index = books.findIndex((b) => b.isbn === book.isbn);
  if (index !== -1) {
    books[index] = { ...book, ...newBookData };
  }
}

function remove(isbn) {
  books = books.filter((b) => b.isbn !== isbn);
}


// Lend Liste
let lends = [
    {"id": "1", "customer_id" : "0101", "isbn" : "3", "borrowed_at" : "2023-04-01", "returned_at" : "2023-05-01"},
    {"id": "2", "customer_id" : "0102", "isbn" : "2", "borrowed_at" : "2023-04-01", "returned_at" : "2023-05-01"},
    {"id": "3", "customer_id" : "0103", "isbn" : "1", "borrowed_at" : "2023-04-01", "returned_at" : "2023-05-01"},
    {"id": "4", "customer_id" : "0104", "isbn" : "4", "borrowed_at" : "2023-04-02", "returned_at" : "2023-05-02"},
    {"id": "5", "customer_id" : "0105", "isbn" : "11", "borrowed_at" : "2023-04-02", "returned_at" : "2023-05-02"},
    {"id": "6", "customer_id" : "0106", "isbn" : "6", "borrowed_at" : "2023-04-03", "returned_at" : "2023-05-03"},
    {"id": "7", "customer_id" : "0107", "isbn" : "5", "borrowed_at" : "2023-04-03", "returned_at" : "2023-05-03"},
    {"id": "8", "customer_id" : "0108", "isbn" : "8", "borrowed_at" : "2023-04-04", "returned_at" : "2023-05-04"}
]


//Lends Seite
app.get('/lends', (request, response) => {
    response.json(lends);


});

app.get('/lends/:id', (request, response) => {
  const id = request.params.id;
  let lend = lends.find(lend => lend.id === id);
  if (lend) {
    response.json(lend);
  }
  else {
    response.status(404).send('Lend not found');
  }
});

// Lend hinzufügen
app.post('/lends', (request, response) => {
  const lend = request.body;
  newLend(lend);
  let status = validate(lend);
  response.sendStatus(status);
});

function newLend (lend) {
  if (validate(lend) === 201) {
  lends = [...lends, lend];
  }
}

// Validate Lend
  
function validate(lend) {
  if (lend.id === "" || lend.customer_id === "" || lend.isbn === "" || lend.borrowed_at === "" || lend.id === null || lend.customer_id === null || lend.isbn === null || lend.borrowed_at === null || checkDates(lend) === 422) {
    return 422;
  } else if (checkUniqueId(lends, lend) === 409) {
    return 409;
  } else if (checkProperties(lend) === 406) {
    return 406;
  } else if (checkBook(lend) === 404) {
    return 404;
  } else {
    return 201;
  }
 
}

function checkDates (lend) {
  const borrowed_at = new Date(lend.borrowed_at);
  const returned_at = new Date(lend.returned_at);
  if (borrowed_at > returned_at) {
    return 422;
  } 
}

function checkUniqueId (lends, lend) {
  const ids = lends.map(lend => lend.id);
  const uniqueIds = [...new Set(ids)];
  if (ids.length !== uniqueIds.length) {
    return 409;
  }
  const isbns = lends.map(lend => lend.isbn);
  const uniqueIsbns = [...new Set(isbns)];
  if (isbns.length !== uniqueIsbns.length && checkReturned(lend) === false) {
    return 409;
  } 

}

function checkBook (lend) {
  const book = books.find(book => book.isbn === lend.isbn);
  if (!book) {
    return 404;
  }
}

function checkReturned(lend) {
  const returned_at = lend.returned_at;
  if (returned_at === "") {
    return false;
  }
  else {
    return true;
  }
  
}

function checkProperties (lend) {
  const properties = Object.keys(lend);
  const requiredProperties = ["id", "customer_id", "isbn", "borrowed_at", "returned_at"];
  const missingProperties = requiredProperties.filter(property => !properties.includes(property));
  if (missingProperties.length > 0) {
    return 406;
  }
  const additionalProperties = properties.filter(property => !requiredProperties.includes(property));
  if (additionalProperties.length > 0) {
    return 406;
  }
  
}








app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
