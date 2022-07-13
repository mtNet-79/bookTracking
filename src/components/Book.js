import UpdateShelf from "./UpdateShelf";
import PropTypes from "prop-types";

const Book = ({ book, handleUpdate }) => {
  const updateShelf = (shelf) => {
    handleUpdate(book, shelf);
  };
  // console.log(
  //   `Book title is ${book.title} vook authors are ${book.authors} and id is ${book.id}`
  // );
  const authors = book.authors ? book.authors.join(", ") : "";
  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${book.imageLinks?.thumbnail})`,
          }}
        ></div>
        <UpdateShelf book={book} handleValueChange={updateShelf} />
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">{authors}</div>
    </div>
  );
};

Book.propTypes = {
  book: PropTypes.object.isRequired,
  handleUpdate: PropTypes.func.isRequired,
};

export default Book;
