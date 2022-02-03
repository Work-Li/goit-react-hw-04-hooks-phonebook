import s from "./Phonebook.module.css";
import PropTypes from "prop-types";

const Phonebook = ({ contacts, onDeleteContact }) => {
  return (
    <ul className={s.contact__list}>
      {contacts.map(({ id, name, number }) => (
        <li key={id} className={s.contact}>
          <p className={s.contact__name}>{name}:</p>
          <p className={s.contact__number}>{number}</p>
          <button
            type="button"
            className={s.btn__delete}
            onClick={() => onDeleteContact(id)}
          >
            Delete contact
          </button>
        </li>
      ))}
    </ul>
  );
};

Phonebook.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object),
  onDeleteContact: PropTypes.func,
};

export default Phonebook;
