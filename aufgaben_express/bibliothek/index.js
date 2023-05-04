import express from 'express';


const app = express();
const port = 3003;
app.use(express.json());


app.get('/', (request, response) => {
    response.status(404).send('Seite nicht Verfügbar! Versuchen Sie es mit http://localhost:3003/books');
});

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






app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
