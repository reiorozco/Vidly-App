import React, { Component } from "react";
import Joi from "joi";
import { Button } from "@mui/material";
import Input from "./input";
import Select from "./select";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    const { data } = this.state;

    const options = { abortEarly: false };
    const { error } = this.schema.validate(data, options);
    if (!error) return null;

    const errors = {};
    error.details.map((item) => (errors[item.path[0]] = item.message));
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = Joi.object({ [name]: this.schema.extract(name) });
    const { error } = schema.validate(obj);

    return error ? error.details[0].message : null;
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit(event);
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    errorMessage
      ? (errors[input.name] = errorMessage)
      : delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, errors });
  };

  renderButton(label) {
    return (
      <Button
        type="submit"
        disabled={this.validate() !== null}
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        {label}
      </Button>
    );
  }

  renderInput(name, label, type = "text", options = {}) {
    const { data, errors } = this.state;

    return (
      <Input
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
        type={type}
        {...options}
      />
    );
  }

  renderSelect(name, label, seleOptions, options = {}) {
    const { data, errors } = this.state;

    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        seleOptions={seleOptions}
        onChange={this.handleChange}
        error={errors[name]}
        {...options}
      />
    );
  }
}

export default Form;
