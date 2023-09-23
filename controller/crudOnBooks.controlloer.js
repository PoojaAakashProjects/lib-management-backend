const config = require('../config.json');
const books = require('../model/books.model');
const { v5: uuidv5, v4: uuidv4 } = require('uuid');
const niv = require('node-input-validator');

const addBook = async(req,res) => {
    const data = req.body;
    const validate = new niv.Validator(
        {data},
        {
            data:'array'
        },
    )
    if(! await validate.check()) {
        return res.status(400).send({success:false,msg:"An array is expected"});
    }
    try {
        let newBooksData = []
    for(let item of data) {
        console.log(item.title,item.author,config.namespace,item.title + item.author)
        let id = uuidv5(item.title + item.author , config.namespace);
        item = {...item,bookId:id};
        newBooksData.push(item);
    }

        const listOfBooks = await books.insertMany(newBooksData,{ordered:false});
        console.log(listOfBooks);
        return res.status(200).send({success:true,msg:"Books added successfully"});
    } catch (error) {
        console.error(`Error occured while adding the books `,error);
        return res.status(500).send({success:false,error:error});
    }
}

const deleteBook = async(req,res) => {
    let id = req.query.id;
    
    const validate = new niv.Validator(
        {id},
        {
            id:'required'
        },
    )
    if(! await validate.check()) {
        return res.status(400).send({success:false,msg:"Missing fields"});
    }
    try {
       
        const listOfBooks = await books.deleteOne({bookId:id});
        return res.status(200).send({success:true,msg:"Book deleted successfully"});
    } catch (error) {
        console.error(`Error occured while deleting the book `,error);
        return res.status(500).send({success:false,error:error});
    }

}

const editBook = async(req,res) => {
    let data = req.body;
    const validate = new niv.Validator(
        {data},
        {
            bookId:'string',
        },
    )
    if(! await validate.check()) {
        return res.status(400).send({success:false,msg:"Missing field"});
    }
    try {
        let bookId = data.bookId;
        let findBook = await books.find({bookId}).lean();
        let objectId = findBook[0]._id;
        console.log(objectId)
        let id = uuidv5(data.title.toLowerCase() + data.author.toLowerCase() , config.namespace);
        data = {...data,bookId:id};
    

        const listOfBooks = await books.findOneAndUpdate({_id:objectId},data);
        console.log(listOfBooks);
        return res.status(200).send({success:true,msg:"Books added successfully"});
    } catch (error) {
        console.error(`Error occured while updating the books `,error);
        return res.status(500).send({success:false,error:error});
    }
}

module.exports = {addBook , deleteBook , editBook}