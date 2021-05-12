import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import profile from "../../img/avatar-circle.png";
import { connect } from "react-redux";
import { deleteContact } from "../../actions/contactActions";
import "../../App.css";
class Contact extends Component {
  state = {
    showContactInfo: false // used for show identity of each contact
  };

  deleteClick = id => {
    this.props.deleteContact(id)
  };

  render() {
    const { id, name, email, phone } = this.props.contact; //pass to Contacts component
    const { showContactInfo } = this.state;
    return (
      <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-12 col-sm-12">
        <div className="card mb-3 p-card-hover mt-3">
          <div className="row no-gutters">
            <div className="col-md-4 d-flex justify-content-center">
              <img
                src={profile}
                className="card-img img-fluid rounded-circle p-1 p-img-profile"
                alt="profile"
              />
            </div>
            <div className="col-md-8 d-flex align-items-center">
              <div className="card-body d-flex justify-content-between">
                <div className="contact-name d-flex align-items-baseline ml-3 pl-1">
                  <h5 className="card-title mr-1">{name}</h5>
                  <i
                    onClick={() =>
                      this.setState({
                        showContactInfo: !this.state
                          .showContactInfo /*toggle the state*/
                      })
                    }
                    className="card-text fa fa-caret-down"
                    style={styles.caret}
                  >
                    {" "}
                  </i>
                </div>
                <div className="contact-edit">
                  <Link to={`contact/edit/${id}`} className="mr-1 float-left">
                    {" "}
                    <i
                      className="card-text fa fa-pencil mr-2"
                      style={styles.pencil}
                    />{" "}
                  </Link>
                  <i
                    onClick={this.deleteClick.bind(this, id)}
                    className="card-text fa fa-times"
                    style={styles.times}
                  />
                </div>
              </div>
            </div>
          </div>
          {showContactInfo ? (
            <ul className="list-group p-tran">
              <li className="list-group-item">
                {" "}
                <i className="fa fa-envelope" /> Email: {email}
              </li>
              <li className="list-group-item">
                {" "}
                <i className="fa fa-phone" /> Phone: {phone}
              </li>
            </ul>
          ) : null}
        </div>
      </div>
    );
  }
}

Contact.defaultProps = {
  // if we have'nt any state we need default values
  contact: {
    name: "no name",
    email: "no email",
    phone: "no number"
  }
};

Contact.propTypes = {
  // check the propstypes
  contact: PropTypes.object.isRequired,
  deleteContact: PropTypes.func.isRequired
};

export default connect(null,{deleteContact})(Contact);

const styles = {
  // just little styling
  caret: {
    color: "#555",
    cursor: "pointer"
  },
  times: {
    color: "#F00",
    cursor: "pointer"
  },
  pencil: {
    color: "#777"
  }
};

