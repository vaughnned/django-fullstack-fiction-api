import React, { useEffect, useState } from "react";

const MyComponent = () => {
  const [data, setData] = useState([]);
  const [bookTitle, setBookTitle] = useState("");

  const getBook = useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/books/");
        const bookData = await response.json();

        setData(bookData);
        console.log({ data });
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  let bookId;
  for (let i = 0; i < data.length; i++) {
    bookId = data[i].id;
    console.log(bookId);
  }

  const handleDelete = (bookId) => {
    fetch(`http://127.0.0.1:8000/books/${bookId}/`, { method: "DELETE" })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          window.location.reload();
          return response;
        }
      })
      .catch((error) => {
        console.error("THIS ISNT WORKING", error);
      });
  };
  const handleCreate = (e) => {
    e.preventDefault();
    fetch("http://127.0.0.1:8000/books/", {
      method: "POST",
      body: JSON.stringify({ title: bookTitle }),
    }).catch((error) => {
      console.error("THIS ISNT WORKING", error);
    });
    console.log(title);
  };
  const onChange = (e) => {
    console.log(bookTitle);
    setBookTitle(e.target.value);
  };

  return (
    <div>
      {data.map((item, i) => (
        <div key={i}>
          <div>{item.title}</div>
          <button
            type="submit"
            value="DELETE"
            onClick={() => handleDelete(item.id)}
          >
            Delete
          </button>
        </div>
      ))}
      <form
        action="http://127.0.0.1:8000/books/"
        method="POST"
        onSubmit={handleCreate}
      >
        <label>
          <span>user:</span>
          <input type="text" name="title" id="title" onChange={onChange} />
          <br />
        </label>
        <button type="submit">Add</button>
      </form>
      {/* <button type="submit" value="POST" onClick={() => handleCreate()}>
        Create Book
      </button> */}
    </div>
  );
};

export default MyComponent;
