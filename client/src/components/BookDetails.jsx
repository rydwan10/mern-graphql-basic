import { graphql } from "react-apollo";
import { flowRight as compose } from "lodash";
import {
  getBookQuery,
  deleteBookQuery,
  getBooksQuery,
} from "../queries/queries";

const BookDetails = (props) => {
  const handleDelete = (id) => {
    if (window.confirm("Delete this book?")) {
      props.deleteBookQuery({
        variables: {
          id: id,
        },
        refetchQueries: [{ query: getBooksQuery }],
      });
      props.setSelectedId(null);
    }
  };

  const displayBookDetail = () => {
    const { book } = props.data;
    if (book) {
      return (
        <div>
          <div id="delete-wrapper">
            <h2>{book.name}</h2>
            <button onClick={() => handleDelete(book.id)} id="delete-button">
              Delete Book
            </button>
          </div>
          <p>{book.genre}</p>
          <h4>By: {book.author.name}</h4>
          <p>All books by this author: </p>
          <ul className="other-books">
            {book.author.books.map((item) => {
              return <li key={item.id}>{item.name}</li>;
            })}
          </ul>
        </div>
      );
    } else {
      return <div>No book selected...</div>;
    }
  };

  return (
    <div id="book-details" className="bookDetail">
      {displayBookDetail()}
    </div>
  );
};

export default compose(
  graphql(getBookQuery, {
    options: (props) => {
      return {
        variables: {
          id: props.bookId,
        },
      };
    },
  }),

  graphql(deleteBookQuery, { name: "deleteBookQuery" })
)(BookDetails);
