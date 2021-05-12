import React, { Component } from "react";
import TextInputGroup from "../layout/TextInputGroup";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getContact, updateContact } from "../../actions/contactActions";
// import uuid from "uuid";

class EditContact extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    errors: {}
  };

  componentWillReceiveProps(nextProps, nextState) {
    const { name, email, phone } = nextProps.contact;
    this.setState({
      name,
      email,
      phone
    });
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getContact(id);
  }

  pOnChange = e => this.setState({ [e.target.name]: e.target.value });

  pOnSubmit = e => {
    e.preventDefault();
    const { name, email, phone } = this.state;
    //check for errors

    if (name === "") {
      this.setState({ errors: { name: "Name is required!" } });
      return null;
    }
    if (email === "") {
      this.setState({ errors: { email: "Email is required!" } });
      return null;
    }
    if (phone === "") {
      this.setState({ errors: { phone: "Phone is required!" } });
      return null;
    }

    const { id } = this.props.match.params;
    const updContact = {
      id,
      name,
      email,
      phone
    };

    this.props.updateContact(updContact);

    //Clear State
    this.setState({
      name: "",
      email: "",
      phone: "",
      errors: {}
    });

    this.props.history.push("/");
  };
  render() {
    const { name, email, phone, errors } = this.state;
    return (
      <div className="col col-md-6 offset-md-3 col-sm-12">
        <div className="card mb-3">
          <div className="card-header">Edit Contact</div>
          <div className="card-body">
            <form onSubmit={this.pOnSubmit}>
              <TextInputGroup
                label="Name"
                name="name"
                value={name}
                placeholder="Enter Name..."
                onChange={this.pOnChange}
                error={errors.name}
              />
              <TextInputGroup
                label="Email"
                name="email"
                value={email}
                type="email"
                placeholder="Enter Email..."
                onChange={this.pOnChange}
                error={errors.email}
              />
              <TextInputGroup
                label="Phone"
                name="phone"
                value={phone}
                placeholder="Enter Phone..."
                onChange={this.pOnChange}
                error={errors.phone}
              />
              <input
                type="submit"
                value="Update Contact"
                className="btn btn-success btn-block"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

EditContact.propTypes = {
  contact: PropTypes.object.isRequired,
  getContact: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  contact: state.contact.singleContact
});

export default connect(
  mapStateToProps,
  { getContact, updateContact }
)(EditContact);
