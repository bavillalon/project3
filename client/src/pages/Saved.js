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
    user: "",
    username: "",
    runsheet: []
  };

  componentDidMount() {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    axios.post('/token')
      .then(res => {
        console.log(res.data.runsheet)
        this.setState({ user: res.data._id, username: res.data.username, runsheet: res.data.runsheet.map(document => JSON.parse(document)) })
      })
      .catch((error) => {
        console.log(error)
        if (error.response.status === 401) {
          console.log(error.response.status)
          this.props.history.push("/login");
        }
      });
  }

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };


  render() {
    return (
      <div className="container">
        <div className="panel panel-default">
         <div className="panel-heading">
            <h3 className="panel-title">
              County Search &nbsp;
              {localStorage.getItem('jwtToken') &&
                <button className="btn btn-primary" onClick={this.logout}>Logout {this.state.username}</button>
              }
            </h3>
          </div>
        <Row>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Runsheet for {this.state.username} </h1>
            </Jumbotron>
            {this.state.runsheet.length==0?(<h3>Nothing in Runsheet</h3>):(
              <table className="table table-stripe">
                <thead>
                  <tr>
                    <th>Instrument</th>
                    <th>Grantor</th>
                    <th>Grantee</th>
                    <th>Filing Date</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.runsheet.map(document => (
                    console.log(document),
                    <tr key={document._id}>
                      <td>{document[0].instrumentNumber}</td>
                      <td>{document[0].grantor}</td>
                      <td>{document[0].grantee}</td>
                      <td>{document[0].filingDate}</td>
                      <td>{document[0].description}</td>
                    </tr>
                  )
                  )}
                </tbody>
            </table>
            )}
            
          </Col>
        </Row>
        </div>
        </div>
    );
  }
}

export default Books;
