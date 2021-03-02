import React, { Component } from "react";
import { Link } from "react-router-dom";
// import { db } from './../../Firebase';
import Classes from "./ContactTable.css";
import axios from "./../../axios";

class ContactTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contacts: [],
      loading: true,
    };
  }

  componentDidMount() {
    axios
      .get("/contact.json")
      .then((res) => {
        const fetchedContacts = [];
        for (let key in res.data) {
          fetchedContacts.push({
            ...res.data[key],
            id: key,
          });
        }
        this.setState({ loading: false, contacts: fetchedContacts });
      })
      .catch((err) => {
        this.setState({ loading: false });
      });
  }

  render() {
    let id = 0;
    return (
      <div className={Classes.Display}>
        <Link to="/adduser">
          <div className={Classes.AddControl}>
            <button className={Classes.AddButton}>Add New</button>
          </div>
        </Link>

        <div className={Classes.Table}>
          <table>
            <thead>
              <tr>
                <th>SL No</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {this.state.contacts.map((data, index) => {
                id++;
                return (
                  <tr key={index}>
                    <td>{id}</td>
                    <td>{data.name}</td>
                    <td>{data.phone}</td>
                    <td>{data.email}</td>
                    <td>{data.location}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ContactTable;
