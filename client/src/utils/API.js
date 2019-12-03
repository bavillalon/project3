import axios from "axios";
axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
export default {
  // Gets all books
  searchGrantor: function(query) {
    console.log("I'm here")
    return axios.get("/api/books",{params:{grantor:query}});
  },
  // Gets the book with the given id
  saveToRunsheet: function(userid,payload) {
    console.log(userid,payload)
    return axios.post("/api/runsheet/" + userid,{data:payload});
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
