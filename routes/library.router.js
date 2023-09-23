const express = require('express');
const router = express.Router();
const {getBooksList , getBookById} = require('../controller/retrieveBooks.controller');
const {addBook , deleteBook , editBook} = require('../controller/crudOnBooks.controlloer');
const { generateData } = require('../controller/generateData.controller');

router.post('/get-books-list', getBooksList);

router.get('/get-book',getBookById);

router.post('/add-book',addBook);

router.post('/update-book',editBook);

router.delete('/delete-book',deleteBook);

router.post('/generate-books-data', generateData);


module.exports = router