import { useState } from "react";
import { graphql } from "react-apollo";
import { getBooksQuery } from "../queries/queries";
import BookDetails from "./BookDetails";

const BookList = (props) => {
  const [selectedId, setSelectedId] = useState(null);

  const displayBooks = () => {
    const { data } = props;
    if (data.loading) {
      return <div>Loading books...</div>;
    } else {
      return data.books.map((book) => {
        return (
          <li
            onClick={() => {
              setSelectedId(book.id);
            }}
            key={book.id}
          >
            {book.name}
          </li>
        );
      });
    }
  };

  return (
    <div>
      <ul className="bookList" id="book-list">
        {displayBooks()}
      </ul>
      <BookDetails bookId={selectedId} setSelectedId={setSelectedId} />
    </div>
  );
};

export default graphql(getBooksQuery)(BookList);
