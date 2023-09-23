const books = require('../model/books.model');
const niv = require('node-input-validator');


const getBookById = async (req, res) => {
    let id = req.query.id;
    const validate = new niv.Validator(
        { id },
        {
            id: 'required'
        },
    )
    if (! await validate.check()) {
        return res.status(400).send({ success: false, msg: "Missing fields" });
    }
    try {

        const listOfBooks = await books.find({ bookId: id });
        console.log(listOfBooks);
        return res.status(200).send({ success: true, data: listOfBooks });
    } catch (error) {
        console.error(`Error occured while fetching a book `, error);
        return res.status(500).send({ success: false, error: error });
    }

}

const getBooksList = async (req, res) => {
    const { page, pageSize } = req.query;
    const filteredData = req.body;

    const parsedPage = parseInt(page, 10);
    const parsedPageSize = parseInt(pageSize, 10);

    if (isNaN(parsedPage) || isNaN(parsedPageSize) || parsedPage <= 0 || parsedPageSize <= 0) {
        return res.status(400).json({ error: 'Invalid input parameters' });
    }
    try {
        const skipCount = (parsedPage - 1) * parsedPageSize;
        let data = []
        let totalCount
        if (Object.keys(filteredData).length > 0) {
            let query = {};
            switch (filteredData.relation) {
                case "contains":
                    query[filteredData.attribute] = { $regex: new RegExp(filteredData.value, "i") };
                    break;
                case "equals":
                    query[filteredData.attribute] = filteredData.value;
                    break;
                case "not equal":
                    query[filteredData.attribute] = { $ne: filteredData.value };
                    break;
                default:
                    break;
            }
            data = await books.find(query)
                .skip(skipCount)
                .limit(parsedPageSize).sort({"updatedAt":"-1"});
            totalCount = await books.find(query).countDocuments();

        } else {
            data = await books.find()
                .skip(skipCount)
                .limit(parsedPageSize).sort({"updatedAt":"-1"});
            totalCount = await books.countDocuments();
        }

        const totalPages = Math.ceil(totalCount / parsedPageSize);

        res.status(200).json({ data, totalPages });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }

}



module.exports = { getBooksList, getBookById }