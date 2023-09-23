const dataset = require('../data.json');
const config = require('../config.json');
const books = require('../model/books.model');
const { v5: uuidv5, v4: uuidv4 } = require('uuid');

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 * @desc this controller is to gereate data, it receives array of object and it creates bookId and push it to db
 */
const generateData = async(req,res) => {
    try {
        let dataArr = []
        for(let item of dataset){
            let obj = {}
            obj['title'] = item.title;
            console.log(item.author)
            let author = item.author
            obj['author'] = author[0];
            obj['genre'] = item.genre;
            obj['description'] = item.description;
            obj['publicationYear'] = item.publicationYear;
            console.log(item.title,' ',item.author)
            obj['bookId'] = uuidv5(item.title.toLowerCase()+obj.author.toLowerCase(),config.namespace);
            console.log(obj.bookId)
            dataArr.push(obj)
        }

        const result = await books.insertMany(dataArr);
        console.log(result);
        return res.status(200).send({success:true,msg:"data set imported","result":result});


        
    } catch (error) {
        console.error(`Error occured in generating data `,error)
        return res.status(500).send({success:false,error:error});
    }

}

module.exports = {generateData}