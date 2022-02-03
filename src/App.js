import { useState, useEffect } from "react";

import s from "./App.module.css";
import React from "react";
import Phonebook from "./components/Phonebook/Phonebook";
import Form from "./components/Form/Form";
import Filter from "./components/Filter/Filter";
import { nanoid } from "nanoid";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState("");
  // state = {
  //   // contacts: [],
  //   contacts: [
  //     // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  //     // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  //     // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  //     // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  //   ],
  //   filter: '',
  // };
  useEffect(() => {
    const contacts = localStorage.getItem("contacts");
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      setContacts(parsedContacts);
    } else {
      setContacts([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts), [contacts]);
  });

  // componentDidMount() {
  //   const contacts = localStorage.getItem('contacts');
  //   const parsedContacts = JSON.parse(contacts);

  //   if (parsedContacts) {
  //     this.setState({ contacts: parsedContacts });
  //   }
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   if (this.state.contacts !== prevState.contacts) {
  //     localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  //   }
  // }

  const deleteContact = (contactId) => {
    setContacts(contacts.filter((contact) => contact.id !== contactId));
    // this.setState(prevState => ({
    //   contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    // }));
  };

  const addContact = (name, number) => {
    console.log({ name, number });
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    const notify = () => `${name} is already in contacts.`;
    if (contacts.find((contact) => contact.name === name)) {
      toast.error(notify);
    } else {
      setContacts((prevContacts) => [contact, ...prevContacts]);
      // this.setState(({ contacts }) => ({
      //   contacts: [contact, ...contacts],
      // }));
    }
  };

  const changeFilter = (e) => {
    setFilter(e.currentTarget.value);
  };

  const getfilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };
  const filteredContacts = getfilteredContacts();

  return (
    <>
      <Toaster />
      <h1 className={s.title}>Phonebook</h1>
      <Form onSubmit={addContact} />

      <h2 className={s.title}>Contacts</h2>

      <Filter value={filter} onChange={changeFilter} />
      <Phonebook contacts={filteredContacts} onDeleteContact={deleteContact} />
    </>
  );
}

export default App;
