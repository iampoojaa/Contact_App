import React, { PureComponent } from "react";

import Auxiliary from "../hoc/Auxiliary";
import Classes from "./ContactDetails.css";
import { Link } from "react-router-dom";
import axios from "./../axios";
// import Spinner from "./../components/UI/Spinner/Spinner";
import Preview from "./../components/Preview/Preview";

const CONSTANT_DETAILS = {
  name: "",
  phone: "",
  email: "",
  location: "",
};

class ContactDetails extends PureComponent {
  constructor(props) {
    super(props);
    this.formId = 0;

    this.state = {
      formArrayState: [],
      formIdContainer: [],
      previewable: false,
      previewing: false,
      loading: false,
    };
  }

  previewHandler = () => {
    this.setState({ previewing: true });
  };

  previewCancelHandler = () => {
    this.setState({ previewing: false });
  };

  submitHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });

    this.state.formIdContainer.map((id) => {
      const object = {
        name: id.name,
        phone: id.phone,
        email: id.email,
        location: id.location,
      };
      axios
        .post("/contact.json", object)
        .then((response) => {
          this.setState({ loading: false });
          this.props.history.push("/");
        })
        .catch((error) => {
          this.setState({ loading: false });
        });
      return null;
    });
  };

  previewSubmitHandler = () => {
    alert("submited");
  };

  updatePreviewState = (formArrayState) => {
    const sum = formArrayState.length;

    this.setState({ previewable: sum > 0 });
  };

  addComponentHandlers = () => {
    this.formId = this.formId + 1;
    const copyFormArrayState = Object.assign([], this.state.formArrayState);
    copyFormArrayState.push(this.formId);

    const copyFormIdContainer = this.state.formIdContainer;
    const obj = {
      key: this.formId,
      name: CONSTANT_DETAILS.name,
      phone: CONSTANT_DETAILS.phone,
      email: CONSTANT_DETAILS.email,
      location: CONSTANT_DETAILS.location,
    };
    copyFormIdContainer.push(obj);

    this.setState({
      formArrayState: copyFormArrayState,
      formIdContainer: copyFormIdContainer,
    });
    this.updatePreviewState(copyFormArrayState);
  };
  removeComponentHandlers = () => {
    this.formId = this.formId - 1;
    const copyFormArrayState = Object.assign([], this.state.formArrayState);
    copyFormArrayState.pop(this.formId);

    const copyFormIdContainer = this.state.formIdContainer;
    copyFormIdContainer.pop(this.formId);

    this.setState({
      formArrayState: copyFormArrayState,
      formIdContainer: copyFormIdContainer,
    });
    this.updatePreviewState(copyFormArrayState);
  };

  nameChangeHandler = (event, value) => {
    event.preventDefault();
    const userIndex = this.state.formIdContainer.findIndex((user) => {
      return user.key === value;
    });

    const user = {
      ...this.state.formIdContainer[userIndex],
    };

    user.name = event.target.value;

    const updatedFormIdContainer = [...this.state.formIdContainer];
    updatedFormIdContainer[userIndex] = user;

    this.setState({
      formIdContainer: updatedFormIdContainer,
    });
  };

  phoneChangeHandler = (event, value) => {
    event.preventDefault();
    const userIndex = this.state.formIdContainer.findIndex((user) => {
      return user.key === value;
    });

    const user = {
      ...this.state.formIdContainer[userIndex],
    };

    user.phone = event.target.value;

    const updatedFormIdContainer = [...this.state.formIdContainer];
    updatedFormIdContainer[userIndex] = user;

    this.setState({
      formIdContainer: updatedFormIdContainer,
    });
  };
  emailChangeHandler = (event, value) => {
    event.preventDefault();
    const userIndex = this.state.formIdContainer.findIndex((user) => {
      return user.key === value;
    });

    const user = {
      ...this.state.formIdContainer[userIndex],
    };

    user.email = event.target.value;

    const updatedFormIdContainer = [...this.state.formIdContainer];
    updatedFormIdContainer[userIndex] = user;

    this.setState({
      formIdContainer: updatedFormIdContainer,
    });
  };

  locationChangeHandler = (event, value) => {
    event.preventDefault();
    const userIndex = this.state.formIdContainer.findIndex((user) => {
      return user.key === value;
    });

    const user = {
      ...this.state.formIdContainer[userIndex],
    };

    user.location = event.target.value;

    const updatedFormIdContainer = [...this.state.formIdContainer];
    updatedFormIdContainer[userIndex] = user;

    this.setState({
      formIdContainer: updatedFormIdContainer,
    });
  };

  render() {
    return (
      <Auxiliary>
        <div>
          <div className={Classes.AddControl}>
            <Link to="/">
              <button className={Classes.Back}>Back</button>
            </Link>
            <button className={Classes.Add} onClick={this.addComponentHandlers}>
              Add Form
            </button>
          </div>
          {this.state.formIdContainer.map((value) => {
            return (
              <div className={Classes.FormDiv} key={value.key} id={value.key}>
                <span
                  className={Classes.RemoveControl}
                  key={value.key}
                  id={value.key}
                  onClick={this.removeComponentHandlers}
                >
                  &times;
                </span>
                <div className={Classes.OutterDiv}>
                  <form id={value.key} className={Classes.Input}>
                    <label id={value.key} className={Classes.Label}>
                      Name :
                    </label>
                    <input
                      key={value.key}
                      id={value.name}
                      className={Classes.InputElement}
                      type="text"
                      placeholder="ex: John Smith"
                      onChange={(event) =>
                        this.nameChangeHandler(event, value.key)
                      }
                      required
                    ></input>

                    <label id={value.key} className={Classes.Label}>
                      Phone No :
                    </label>
                    <input
                      id={value.phone}
                      className={Classes.InputElement}
                      type="tel"
                      placeholder="ex: 9087654321"
                      onChange={(event) =>
                        this.phoneChangeHandler(event, value.key)
                      }
                      required
                    ></input>
                    <label id={value.key} className={Classes.Label}>
                      Email :
                    </label>
                    <input
                      id={value.email}
                      className={Classes.InputElement}
                      type="email"
                      placeholder="ex: john@gmail.com"
                      onChange={(event) =>
                        this.emailChangeHandler(event, value.key)
                      }
                      required
                    ></input>
                    <label id={value.key} className={Classes.Label}>
                      Location :
                    </label>
                    <input
                      id={value.location}
                      className={Classes.InputElement}
                      type="text"
                      placeholder="ex: London"
                      onChange={(event) =>
                        this.locationChangeHandler(event, value.key)
                      }
                      required
                    ></input>
                  </form>
                </div>
              </div>
            );
          })}

          <Preview
            previewing={this.state.previewing}
            previewCancelHandler={this.previewCancelHandler}
            previewable={this.state.previewable}
            submitted={this.previewHandler}
            previewSubmitHandler={this.submitHandler}
            previewCancelled={this.previewCancelHandler}
            contactform={this.state.formIdContainer}
          />
        </div>
      </Auxiliary>
    );
  }
}

export default ContactDetails;
