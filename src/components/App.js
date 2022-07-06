import "../css/App.css";
import { useEffect, useState } from "react";
import ListBooks from "./ListBooks";
import SearchBooks from "./SearchBooks";
import { Route, Routes, useNavigate } from "react-router-dom";
import * as BooksAPI from "../utils/BooksAPI";

function App() {
  let nav = useNavigate();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      const res = await BooksAPI.getAll();
      setBooks(res);
    };

    getBooks();
  }, []);

  const updateBook = (book, shelf) => {
    const update = async () => {
      await BooksAPI.update(book, shelf);
      const res = await BooksAPI.getAll();
      setBooks(res);
    };

    update();
    nav("/");
  };

  return (
    <Routes>
      <Route
        exact
        path="/"
        element={<ListBooks books={books} onUpdate={updateBook} />}
      />
      <Route
        path="/search"
        element={<SearchBooks books={books} onUpdate={updateBook} />}
      />
    </Routes>
  );
}

export default App;
