import React from "react";
import s from "./Filter.module.css";
import PropTypes from "prop-types";

const Filter = ({ value, onChange }) => (
  <label className={s.label__filter}>
    Find contacts by name
    <input
      type="text"
      value={value}
      onChange={onChange}
      className={s.input__filter}
    />
  </label>
);

Filter.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default Filter;