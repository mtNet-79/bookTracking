import * as BooksAPI from "../utils/BooksAPI";
import { Link } from "react-router-dom";
import Book from "./Book";
import { useEffect, useState } from "react";

const SearchBooks = ({ books, onUpdate }) => {
  const [query, setQuery] = useState("");

  const [list, setList] = useState("");

  const updateQuery = (evt) => {
    setQuery(evt.target.value);
  };

  useEffect(() => {
    const lookForBooks = async () => {
      const res = await BooksAPI.search(query);
      if (res && !res.error) {
        setupShelfList(res, books);
      } else if (res.error) {
        setList("");
      }
    };

    query !== "" ? lookForBooks() : setList([]);
  }, [query]);

  const setupShelfList = (list, booksOnShelf) => {
    const booksOnShelfObj = booksOnShelf.reduce((result, item) => {
      result[item.id] = item;
      return result;
    }, {});

    const updatedBookList = list.map(
      (book) => booksOnShelfObj[book.id] || book
    );

    let resultArr = [];
    updatedBookList.forEach((book) => {
      book.shelf ? void 0 : (book.shelf = "none");
      resultArr.push(book);
    });
    setList(resultArr);
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            onChange={updateQuery}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {list ? (
            list.map((book) => (
              <li key={book.id}>
                <Book book={book} handleUpdate={onUpdate} />
              </li>
            ))
          ) : (
            <div>
              <p>Not Found</p>
            </div>
          )}
        </ol>
      </div>
    </div>
  );
};

export default SearchBooks;
