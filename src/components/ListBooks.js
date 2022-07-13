import BookShelf from "./BookShelf";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ListBooks = ({ books, onUpdate }) => {
  const wantToRead = books.filter((book) => book.shelf === "wantToRead");
  const read = books.filter((book) => book.shelf === "read");
  const currentlyReading = books.filter(
    (book) => book.shelf === "currentlyReading"
  );

  const booksByShelves = [
    {
      id: 1,
      name: "Currently Reading",
      books: currentlyReading,
    },
    {
      id: 2,
      name: "Want To Read",
      books: wantToRead,
    },
    {
      id: 3,
      name: "Read",
      books: read,
    },
  ];

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {booksByShelves.map((shelf) => (
            <BookShelf
              shelf={shelf.name}
              books={shelf.books}
              handleUpdate={onUpdate}
              key={shelf.id}
            />
          ))}
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    </div>
  );
};

ListBooks.propTypes = {
  books: PropTypes.array.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default ListBooks;
