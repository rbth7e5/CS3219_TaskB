import React, {useEffect, useState} from 'react';
import formurlencoded from 'form-urlencoded';
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

function App() {
  const uri = 'https://3a3opn0d5c.execute-api.ap-southeast-1.amazonaws.com/prod/api';
  const [contacts, setContacts] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
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
    console.log(formurlencoded(contact));
    fetch(`${uri}/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formurlencoded(contact)
    }).catch(error => {
        setShowAddModal(false);
        alert(`Add new contact failed: ${error}`);
      })
      .then(response => response.json())
      .then(result => {
        setShowAddModal(false);
        let clone = [...contacts];
        clone.push(result.data);
        setContacts(clone);
        alert(result.message);
      })
  }
  const handleUpdate = (contact) => {
    fetch(`${uri}/contacts/${contact._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formurlencoded(contact)
    }).catch(error => alert(`Update contact failed: ${error}`))
      .then(response => response.json())
      .then(result => {
        setShowEditModal(false);
        let clone = contacts.filter(c => c._id !== contact._id);
        clone.push(result.data);
        setContacts(clone);
        alert(result.message);
      });
  }
  return (
    <>
      <Container>
        <Navbar>
          <Navbar.Brand>Contacts</Navbar.Brand>
          <Button style={{marginLeft: 'auto'}} onClick={() => {
            setId("");
            setName("");
            setGender("");
            setEmail("");
            setPhone("");
            setShowAddModal(true);
          }}>Add Contact</Button>
        </Navbar>
        <Table hover>
          <thead>
            <tr>
              <th>id</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Email</th>
              <th>Phone</th>
              <th/>
              <th/>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact, i) =>
              <tr key={i}>
                <td>{contact._id}</td>
                <td>{contact.name}</td>
                <td>{contact.gender}</td>
                <td>{contact.email}</td>
                <td>{contact.phone}</td>
                <td><Button variant='danger' onClick={() => handleDelete(contact)}>Delete</Button></td>
                <td><Button onClick={() => {
                  setId(contact._id);
                  setName(contact.name);
                  setGender(contact.gender);
                  setEmail(contact.email);
                  setPhone(contact.phone);
                  setShowEditModal(true);
                }}>Edit</Button></td>
              </tr>
            )}
          </tbody>
        </Table>
      </Container>
      <Modal show={showAddModal || showEditModal} onHide={() => {
        setShowEditModal(false);
        setShowAddModal(false);
      }}>
        <Modal.Header closeButton>
          <Modal.Title>Add Contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control value={name} name="name" onChange={e => setName(e.target.value)} type="text" placeholder="Enter name" />
            </Form.Group>
            <Form.Group controlId="formGender">
              <Form.Label>Gender</Form.Label>
              <Form.Control value={gender} name="gender" onChange={e => setGender(e.target.value)} type="text" placeholder="Enter Gender" />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control value={email} name="email" onChange={e => setEmail(e.target.value)} type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group controlId="formPhone">
              <Form.Label>Phone number</Form.Label>
              <Form.Control value={phone} name="phone" onChange={e => setPhone(e.target.value)} type="number" placeholder="Enter phone number" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {
            setShowEditModal(false);
            setShowAddModal(false);
          }}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => {
            if (showEditModal) {
              handleUpdate({
                _id: id,
                name: name,
                gender: gender,
                email: email,
                phone: phone
              });
            } else {
              handleAdd({
                name: name,
                gender: gender,
                email: email,
                phone: phone
              });
            }
          }}>
            {showEditModal ? "Edit" : "Add"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default App;
