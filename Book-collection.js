const express = require('express');
const app = express();
const port = 8000;

app.use(express.static('public'));

app.use(express.json());

const books = [
    {
        "id":1,
        "title": "ABC",
        "author":"john",
        "publishedDate": "01/03/2023"
    },
    {
        "id":2,
        "title": "DEF",
        "author":"john",
        "publishedDate": "01/03/2023"
    },
    {
        "id":3,
        "title": "GHI",
        "author":"john",
        "publishedDate": "01/03/2023"
    },

];

app.get('/books', (req, res) => {
    res.json(books);
});

app.post('/books', (req, res) => {
    const { title, author, publishedDate } = req.body;

    if (!title || !author) {
        res.status(400).json({ message: 'Title and author are required' });
        return;
    }

    const book = {
        id: books.length + 1,
        title,
        author,
        publishedDate,
    };

    books.push(book);

    res.status(201).json(book);
});

app.delete('/books/:id', (req, res) => {
    const id = Number(req.params.id);

    const index = books.findIndex((book) => book.id === id);

    if (index === -1) {
        res.status(404).json({ message: 'Book not found' });
        return;
    }

    books.splice(index, 1);

    res.json({ message: 'Book deleted successfully' });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});