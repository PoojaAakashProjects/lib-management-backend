const mongoose = require('mongoose');

const booksSchema = new mongoose.Schema({
    bookId:{
        type:"String",
        unique:true,
        required:true
    },
    title:{
        type:"String",
    },
    author:{
        type:"String",
    },
    genre:{
        type:"String",
    },
    publicationYear:{
        type:"String",
    },
    description:{
        type:"string"
    }
},{
    timestamps:true
})

module.exports = mongoose.model('books',booksSchema);