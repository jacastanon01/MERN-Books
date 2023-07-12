const Books = require("../models/Books")

// @desc Get all books from MongoDB collection
// @route GET api/books
const getAllBooks = async (req, res) => {
    const category = req.query.category
    const filter = {}

    if (category){
        filter.category = category
    }

    try {
        const data =  await Books.find(filter)
        res.json(data)
    } catch (error) {
     res.status(500).json({error: "Error fetching books"})   
    }
}

// @desc Retrieve single book 
// @route GET api/books/:slug 
const getSingleBook = async (req, res) => {
    const slugParams = req.params.slug
    try {
        const data =  await Books.findOne({slug: slugParams})
        res.json(data)
    } catch (error) {
     res.status(500).json({error: "Error fetching books"})   
    }
}

// @desc Add new book to collection
// @route POST api/books
const createNewBook = async (req, res) => {
  try {
    console.log(req.body);

    const newBook = new Books({
      title: req.body.title,
      slug: req.body.slug,
      stars: req.body.stars,
      description: req.body.description,
      category: req.body.category,
      thumbnail: req.file.filename,
    })

    await Books.create(newBook);
    res.json("Data Submitted");
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching books." });
  }
}

// @desc Update the given book
// @route PUT api/books/:slug
const updateBook = async (req, res) => {
    try {
        const { bookId } = req.body

        const updatedBook = {
        title: req.body.title,
        slug: req.body.slug,
        stars: req.body.stars,
        description: req.body.description,
        category: req.body.category,
        }

        if (req.file) {
            updatedBook.thumbnail = req.file.filename
        }

        await Books.findByIdAndUpdate(bookId, updatedBook)
        res.json("Data Submitted");
    } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching books." });
    }
}

// @desc Remove book from collection
// @route DELETE api/books/:id
const deleteBook = async (req, res) => {
    const bookId = req.params.id
    try {
        await Books.deleteOne({_id: bookId})
        res.json("DELETED")
    } catch (error) {
        res.json(error)
    }
}

const bookController = {
    getAllBooks,
    getSingleBook,
    createNewBook,
    updateBook,
    deleteBook
}

module.exports = bookController