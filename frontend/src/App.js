import React, {useEffect, useState} from 'react';
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

function App() {
  const uri = 'http://localhost:8080/api';
  let [contacts, setContacts] = useState([])
  useEffect(() => {
    fetch(`${uri}/contacts`)
      .then(response => response.json())
      .then(result => setContacts(result.data));
  }, []);
  const handleDelete = (contact) => {
    fetch(`${uri}/contacts/${contact._id}`, {method: 'DELETE'})
      .catch(error => alert(`Delete failed: ${error}`))
      .then(response => {
        if (response.status === 200) {
          let clone = [...contacts];
          clone.splice(clone.indexOf(contact), 1);
          setContacts(clone);
          alert('Delete success!');
        } else {
          alert('Delete failed');
        }
      });
  }
  const handleAdd = (contact) => {
    fetch(`${uri}/contacts`, {
      method: 'POST',
      body: JSON.stringify(contact)
    }).catch(error => alert(`Add new contact failed: ${error}`))
      .then(response => response.json())
      .then(result => alert(result.message));
  }
  return (
    <Container>
      <Navbar>
        <Navbar.Brand>Contacts</Navbar.Brand>
        <Button style={{marginLeft: 'auto'}}>Add Contact</Button>
      </Navbar>
      <Table hover>
        <thead>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact, i) =>
            <tr key={i}>
              <td>{contact._id}</td>
              <td>{contact.name}</td>
              <td>{contact.gender}</td>
              <td>{contact.email}</td>
              <td>{contact.phone}</td><td><Button variant='danger' onClick={() => handleDelete(contact)}>Delete</Button></td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
}

export default App;
