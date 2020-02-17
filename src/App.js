import React from 'react';
import './App.css';
import Axios from 'axios';

class App extends React.Component {
  state = {
    name: {
      value: "",
      error: ""
    },
    surname: {
      value: "",
      error: ""
    },
    email: {
      value: "",
      error: ""
    },
    phone: {
      value: "",
      error: ""
    },
    users: []
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: {
        error: "",
        value: e.target.value
      }
    })
  }

  render() {
    return (
      <div className="form">
        <form onSubmit={this.handleSubmit}>
          <label>Imię
<input type="text" name="name" value={this.state.name.value} onChange={this.handleChange}></input></label>
          <p>{this.state.name.error}</p>
          <label>Nazwisko
<input type="text" name="surname" value={this.state.surname.value} onChange={this.handleChange}></input></label>
          <p>{this.state.surname.error}</p>
          <label>Email
<input type="text" name="email" value={this.state.email.value} onChange={this.handleChange}></input></label>
          <p>{this.state.email.error}</p>
          <label>Telefon
<input type="text" name="phone" value={this.state.phone.value} onChange={this.handleChange}></input></label>
          <p>{this.state.phone.error}</p>
          <button>Wyślij</button>
        </form>
      </div>
    )
  }

}

export default App;
