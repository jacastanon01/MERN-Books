import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./index.css"
import { createBrowserRouter, createRoutesFromElements, Link, Route, RouterProvider } from 'react-router-dom'
import About from './routes/About/About.jsx'
import Book from './routes/Book/Book.jsx'
import BookDetails from './routes/Book/BookDetails.jsx'
import CreateBook from './routes/Book/CreateBook.jsx'
import EditBook from './routes/Book/EditBook.jsx'
import Home from './routes/Home/Home.jsx'
import RootLayout from './components/RootLayout.jsx'
import AddBook from './routes/Book/AddBook.jsx'

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/"element={<RootLayout />} >
    <Route index element={<Home />} />
    <Route path="about" element={<About />} />
    <Route path="books" element={<Book />} />
      <Route path="books/:slug" element={<BookDetails />} />
      <Route path="books/create" element={<CreateBook />} />
      <Route path="books/edit/:slug" element={<EditBook />} />

  </Route>
))

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
