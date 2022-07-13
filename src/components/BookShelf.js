import Book from "./Book";
import PropTypes from "prop-types";

const BookShelf = ({ handleUpdate, books, shelf }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelf}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book) => (
            <li key={book.id}>
              <Book book={book} handleUpdate={handleUpdate} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

BookShelf.propTypes = {
  books: PropTypes.array.isRequired,
  shelf: PropTypes.string.isRequired,
  handleUpdate: PropTypes.func.isRequired,
};

export default BookShelf;
