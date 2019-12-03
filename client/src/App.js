import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Col, Row, Container } from "./components/Grid";
import { List, ListItem } from "./components/List";
import { Input, FormBtn } from "./components/Form";
import Thumbnail from "./components/Thumbnail";
import Jumbotron from "./components/Jumbotron";
import API from "./utils/API";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      documents: [],
      grantor: "",
      user: "",
      username: ""
    };
  }

  componentDidMount() {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    axios.post('/token')
      .then(res => {
        console.log(res.data._id)
        this.setState({ user: res.data._id, username: res.data.username })
      })
      .catch((error) => {
        console.log(error)
        if (error.response.status === 401) {
          console.log(error.response.status)
          this.props.history.push("/login");
        }
      });
  }

  logout = () => {
    localStorage.removeItem('jwtToken');
    window.location.reload();
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.grantor) {
      API.searchGrantor(this.state.grantor)
        .then(res => {
          console.log(res.data)
          this.setState({
            documents: res.data
          })
        })
        .catch(err => console.log(err));
    }
  };

  AddToRunsheet = event => {
    event.preventDefault();
    API.saveToRunsheet(this.state.user, JSON.stringify(this.state.documents.filter((document) => (document._id === event.target.value))))
      .then(event.target.disabled = true)
      .catch(err => console.log(err));

    //if (this.state.grantor) {
    //  API.searchGrantor(this.state.grantor)
    //    .then(res => {
    //      console.log(res.data)
    //      this.setState({
    //        documents: res.data
    //      })
    //    })
    //    .catch(err => console.log(err));
    //}
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
            <Col size="12">
              <Jumbotron>
                <h1>Grantor Search</h1>
              </Jumbotron>
              <form>
                <Input
                  value={this.state.grantor}
                  onChange={this.handleInputChange}
                  name="grantor"
                  placeholder="search"
                />
                <FormBtn
                  disabled={!(this.state.grantor)}
                  onClick={this.handleFormSubmit}
                >
                  Search
              </FormBtn>
              </form>
            </Col>
          </Row>
          <div className="panel-body">
            {this.state.documents.length ? (
              <table className="table table-stripe">
                <thead>
                  <tr>
                    <th>Instrument</th>
                    <th>Grantor</th>
                    <th>Grantee</th>
                    <th>Filing Date</th>
                    <th>Description</th>
                    <th>Add to Runsheet</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.documents.map(document => (
                    <tr key={document._id}>
                      <td>{document.instrumentNumber}</td>
                      <td>{document.grantor}</td>
                      <td>{document.grantee}</td>
                      <td>{document.filingDate}</td>
                      <td>{document.description}</td>
                      <td><button
                        name="_id"
                        value={document._id}
                        onClick={this.AddToRunsheet}
                        disabled={false}>Add</button></td>
                    </tr>
                  )
                  )}
                </tbody>
              </table>
            ) : (
                <h3>No Results to Display</h3>
              )}
          </div>
        </div>
      </div >
    );
  }
}

export default App;
