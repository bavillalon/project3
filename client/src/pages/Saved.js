import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import Thumbnail from "../components/Thumbnail";
const axios = require("axios");

axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');

class Books extends Component {
  state = {
    documents: [],
  };

  componentDidMount() {
    this.load();
  }

  load = () => {
    API.getBooks("DENSON")
      .then(res =>{
        console.log(res.data);
        this.setState({ documents: res.data })}
      )
      .catch(err => console.log(err));
  };

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };


  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Books On My List</h1>
            </Jumbotron>
            <tr>
                  <th>Instrument</th>
                  <th>Grantor</th>
                  <th>Grantee</th>
                  <th>Filing Date</th>
                  <th>Description</th>
                </tr>
            {this.state.documents.length ? (
                this.state.documents.map(document => (
                  <tr>
                    <td>{document.instrumentNumber}</td>
                    <td>{document.grantor}</td>
                    <td>{document.grantee}</td>
                    <td>{document.filingDate}</td>
                    <td>{document.description}</td>
                  </tr>
            ))
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Books;
