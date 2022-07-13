import * as BooksAPI from "../utils/BooksAPI";
import { Link } from "react-router-dom";
import Book from "./Book";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const useGetBooks = (query, books) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const lookForBooks = async () => {
        try {
          const res = await BooksAPI.search(query);
          if (res) setupShelfList(res, books);
        } catch (error) {
          setResults("");
        } finally {
          setLoading(false);
        }
      };
      // console.log(`query is ${query} and id is ${timeoutId}`);
      if (query !== "") {
        setLoading(true);
        lookForBooks();
      } else setResults([]);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [query, books]);

  const setupShelfList = (resultBooks, books) => {
    const booksOnShelfObj = books.reduce((result, item) => {
      result[item.id] = item;
      return result;
    }, {});

    const updatedBookList = resultBooks.map(
      (book) => booksOnShelfObj[book.id] || book
    );

    let resultArr = [];
    updatedBookList.forEach((book) => {
      book.shelf ? void 0 : (book.shelf = "none");
      resultArr.push(book);
    });
    setResults(resultArr);
  };

  return [results, loading];
};

const SearchBooks = ({ books, onUpdate }) => {
  const [query, setQuery] = useState("");
  const [resultBooks, loading] = useGetBooks(query, books);

  const updateQuery = (evt) => {
    setQuery(evt.target.value);
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
          {loading ? (
            <h1>...</h1>
          ) : resultBooks ? (
            resultBooks.map((book) => (
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

SearchBooks.propTypes = {
  books: PropTypes.array.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default SearchBooks;
