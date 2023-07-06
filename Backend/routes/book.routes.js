const express = require("express");
const bookRoute = express.Router();

const {BookModel} = require("../models/book.model.js");

bookRoute.get('/books', async (req, res) => {
    try {
      const books = await BookModel.find();
      res.status(200).send(books);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch books' });
    }
  });
  
  bookRoute.get('/books/genres/:genre', async (req, res) => {
    const genre = req.params.genre;
  
    try {
      const books = await BookModel.find({ genre });
      res.status(200).send(books);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to get Filtered books' });
    }
  });
  
  bookRoute.get('/books/sort/:odr', async (req, res) => {
    const odr = req.params.odr;
    let value;
  
    try {
        if(odr == "ASC"){
            value = 1;
        }
        else if (odr == "DESC"){
            value = -1;
        }
      const books = await BookModel.find().sort({price: value});
      res.status(200).send(books);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to sort books' });
    }
  });
  
  bookRoute.post('/books', async (req, res) => {
    const { title, author, genre, description, price } = req.body;
  
    const newBook = new BookModel({
      title,
      author,
      genre,
      description,
      price,
    });
  
    try {
      await newBook.save();
      res.status(200).json({ message: 'Book added successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to add book' });
    }
  });
  
  bookRoute.delete('/books/:id', async (req, res) => {
    const bookId = req.params.id;
  
    try {
      await BookModel.findByIdAndDelete(bookId);
      res.send({ message: 'Book deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete book' });
    }
  });

  module.exports = {
    bookRoute
  }