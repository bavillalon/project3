import axios from "axios";

export default {
  // Gets all books
  getBooks: function(query) {
    console.log("I'm here")
    return axios.get("/api/books",{params:{grantor:query}});
  },
  // Gets the book with the given id
  getBook: function(id) {
    return axios.get("/api/books/" + id);
  },
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveBook: function(bookData) {
    return axios.post("/api/books", bookData);
  },
  searchBook: function(query) {
    return axios.get("/api/books/search", { params: { q: query } });
  }
};
