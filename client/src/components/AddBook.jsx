import { useState } from "react";
import { graphql } from "react-apollo";
import { flowRight as compose } from "lodash";
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery,
} from "../queries/queries";

const AddBook = (props) => {
  const [inputData, setInputData] = useState({
    name: "",
    genre: "",
    authorId: "",
  });

  const displayAuthors = () => {
    const data = props.getAuthorsQuery;
    if (data.loading) {
      return <option disabled>Loading Authors...</option>;
    } else {
      return data.authors.map((author) => {
        return (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        );
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      inputData.name.trim() === "" ||
      inputData.genre.trim() === "" ||
      inputData.authorId.trim() === ""
    ) {
      alert("All field must not empty!");
    } else {
      props.addBookMutation({
        variables: {
          name: inputData.name,
          genre: inputData.genre,
          authorId: inputData.authorId,
        },
        refetchQueries: [{ query: getBooksQuery }],
      });
      setInputData({ name: "", genre: "", authorId: "" });
    }
  };

  return (
    <div>
      <form id="add-book" className="addBook" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="bookName">Book Name:</label>
          <input
            type="text"
            name="bookName"
            onChange={(e) =>
              setInputData({ ...inputData, name: e.target.value })
            }
            value={inputData.name}
          />
        </div>

        <div className="field">
          <label htmlFor="genre">Genre:</label>

          <input
            type="text"
            name="genre"
            onChange={(e) =>
              setInputData({ ...inputData, genre: e.target.value })
            }
            value={inputData.genre}
          />
        </div>

        <div className="field">
          <label htmlFor="author">Author:</label>
          <select
            onChange={(e) =>
              setInputData({ ...inputData, authorId: e.target.value })
            }
            name="author"
            id="author"
            value={inputData.authorId}
          >
            <option>Select author</option>
            {displayAuthors()}
          </select>
        </div>

        <button type="submit">+</button>
      </form>
    </div>
  );
};

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);
