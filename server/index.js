require("dotenv").config()
const cors = require("cors")
const express = require("express")
const connectDB = require("./connectDB")
const multer = require("multer")
const Books = require("./models/Books")
const bookController = require("./controllers/bookController")

const app = express()
const PORT = process.env.PORT || 8000


connectDB()
app.use(cors({origin: "http://localhost:5173"}))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use("/uploads", express.static("uploads"))


app.get("/api/books", bookController.getAllBooks)

app.get("/api/books/:slug", bookController.getSingleBook)

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

app.post("/api/books", upload.single("thumbnail"), bookController.createNewBook);

app.put("/api/books", upload.single("thumbnail"), bookController.updateBook);

app.delete("/api/books/:id", bookController.deleteBook)

// app.post("/api/books", async (req, res) => {
//     try {
//         console.log(req.body)
//     } catch (error) {
//         console.log(error)
//     }
// })


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