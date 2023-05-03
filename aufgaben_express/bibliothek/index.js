import express from 'express';

const app = express();
const port = 3002;

app.get('/', (request, response) => {
    response.status(404).send('Seite nicht Verfügbar! Versuchen Sie es mit http://localhost:3002/books');
});

let list_books = [
    {isbn : 1, title : "Harry Potter", author : "J.K. Rowling", year : 1997},
    {isbn : 2, title : "Herr der Ringe", author : "J.R.R. Tolkien", year : 1954},
    {isbn : 3, title : "Der kleine Prinz", author : "Antoine de Saint-Exupéry", year : 1943},
    {isbn : 4, title : "Der Alchimist", author : "Paulo Coelho", year : 1988},
    {isbn : 5, title : "Der Name der Rose", author : "Umberto Eco", year : 1980},
    {isbn : 6, title : "Der Herr der Fliegen", author : "William Golding", year : 1954},
    {isbn : 7, title : "Der Fänger im Roggen", author : "J.D. Salinger", year : 1951},
    {isbn : 8, title : "Der kleine Hobbit", author : "J.R.R. Tolkien", year : 1937},
    {isbn : 9, title : "Die unendliche Geschichte", author : "Michael Ende", year : 1979},
    {isbn : 10, title : "Die Säulen der Erde", author : "Ken Follett", year : 1989},
    {isbn : 11, title : "Die Verwandlung", author : "Franz Kafka", year : 1915},
    {isbn : 12, title : "Die Schatzinsel", author : "Robert Louis Stevenson", year : 1883},
    ]
    

app.get('/books', (request, response) => {
    response.json(list_books);
});

app.get('/books/:isbn', (request, response) => {
    const isbn = request.params.isbn;
    const book = list_books.find(book => book.isbn === isbn); // Use the find() method to look up the book by its ISBN
    if (book) {
      response.json(book);
    }
    else {
      response.status(404).send('Book not found');
    }
  });
  





app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
