import { useState } from "react";

const UpdateShelf = ({ book, handleValueChange }) => {
  const [selected, setSelected] = useState(book.shelf);

  const handleChange = (e) => {
    handleValueChange(e.target.value);
    setSelected(e.target.value);
  };

  return (
    <div className="book-shelf-changer">
      <select id={book.id} onChange={handleChange} value={selected}>
        <option disabled>Move to...</option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    </div>
  );
};

export default UpdateShelf;
