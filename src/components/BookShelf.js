import Book from "./Book";

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

export default BookShelf;
