import {BrowserRouter as Router, Routes, Route, createBrowserRouter } from "react-router-dom"
import Home from "./routes/Home/Home"
import About from "./routes/About/About"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Book from "./routes/Book/Book"
import BookDetails from "./routes/Book/BookDetails"
import AddBook from "./routes/Book/AddBook"
import CreateBook from "./routes/Book/CreateBook"
import EditBook from "./routes/Book/EditBook"
import RootLayout from "./components/RootLayout"

function App() {

  return (
    <>
      <Router>
        <Routes element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="books" element={<Book />} />
          <Route path="books/:slug" element={<BookDetails />} />
          <Route path="books/create" element={<CreateBook />} />
          <Route path="books/edit/:slug" element={<EditBook />} />
        </Routes>
      </Router>
    </>
  )
}

// const router = createBrowserRouter([
//   {}
// ])

export default App
