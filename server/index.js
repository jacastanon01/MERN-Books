require("dotenv").config()
const cors = require("cors")
const express = require("express")
const connectDB = require("./connectDB")
const multer = require("multer")
const Books = require("./models/Books")

const app = express()
const PORT = process.env.PORT || 8000


connectDB()
app.use(cors({origin: "http://localhost:5173"}))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use("/uploads", express.static("uploads"))


app.get("/api/books", async (req, res) => {
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
})

app.get("/api/books/:slug", async (req, res) => {
    const slugParams = req.params.slug
    try {
        const data =  await Books.findOne({slug: slugParams})
        res.json(data)
    } catch (error) {
     res.status(500).json({error: "Error fetching books"})   
    }
})

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix + "-" + file.originalname);
    }
  })

const upload = multer({ storage: storage })

app.post("/api/books", upload.single("thumbnail")  ,async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.file);

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
});

// const storage = multer.diskStorage({
//     destination: function(req,file,cb){
//         cb(null, 'uploads/')
//     },
//     fileName: function(req, file, cb){
//         const uniqueSuffix = Date.now() + '-' +Math.round(Math.random() * 169)
//         cb(null, `${uniqueSuffix}-${file.originalname}`)
//     }
// })

// const upload = multer({ storage: storage })

// app.post("/api/books", upload.single("thumbnail"), async (req, res) => {
//     console.log(req.body, req.files)
//     try {
//         const { title, createdAt, description, slug, category, stars } = req.body
//         const newBook = new Books({
//             title, createdAt, description, slug, stars, category
//         })
//         console.log(newBook)
//         await Books.create(newBook)
//     } catch (error) {
//      res.status(500).json({error: "Error fetching books"})   
//     }
// })

// app.get("/", (req, res) => {
//     res.status(200).json("HELLO FROM SERVER")
// })

app.put("/api/books", upload.single("thumbnail")  ,async (req, res) => {
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
});

app.delete("/api/books/:id", async (req, res) => {
    const bookId = req.params.id
    try {
        await Books.deleteOne({_id: bookId})
        res.json("DELETED")
    } catch (error) {
        res.json(error)
    }
})


// app.delete("/api/books/:id", async(req,res) => {
//     const bookId = req.params.id;
  
//     try {
//       await Book.deleteOne({_id: bookId});
//       res.json("How dare you!" + req.body.bookId);
//     } catch (error) {
//       res.json(error);
//     }
//   });

app.get("*", (req, res) => {
    res.sendStatus(404)
})

app.listen(PORT, () => {
    console.log("Listening on port " + PORT)
})