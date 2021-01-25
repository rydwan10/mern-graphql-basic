import { graphql } from "react-apollo";
import { getBookQuery } from "../queries/queries";

const BookDetails = (props) => {
  const displayBookDetail = () => {
    const { book } = props.data;
    if (book) {
      return (
        <div>
          <h2>{book.name}</h2>
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

export default graphql(getBookQuery, {
  options: (props) => {
    return {
      variables: {
        id: props.bookId,
      },
    };
  },
})(BookDetails);
