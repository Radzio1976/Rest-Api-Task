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

  componentDidMount() {
    Axios.get("http://localhost:3000/users").then((response) => {
      this.setState({
        users: response.data
      })
    }).catch((error) => {
      console.log(error)
    })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: {
        error: "",
        value: e.target.value
      }
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;
    if (this.state.name.value.length < 5) {
      this.setState({
        name: {
          ...this.state.name,
          error: "Pole imię musi zawierać conajmniej 5 znaków"
        }
      })
      isValid = false
    }
    if (this.state.surname.value.length < 5) {
      this.setState({
        surname: {
          ...this.state.surname,
          error: "Pole nazwisko musi zawierać conajmniej 5 znaków"
        }
      })
      isValid = false
    }
    if (this.state.email.value.includes("@") === false) {
      this.setState({
        email: {
          ...this.state.email,
          error: "Pole email musi zawierać znak @"
        }
      })
      isValid = false
    }
    if (this.state.phone.value.length !== 9) {
      this.setState({
        phone: {
          ...this.state.phone,
          error: "Pole telefon musi mieć 9 cyfr bez odstępów"
        }
      })
      isValid = false
    }
    if (isValid) {
      Axios.post("http://localhost:3000/users", { name: this.state.name.value, surname: this.state.surname.value, email: this.state.email.value, phone: this.state.phone.value }).then((response) => {
        Axios.get("http://localhost:3000/users").then((response) => {
          this.setState({
            users: response.data,
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
            }
          })
        }).catch((error) => {
          console.log(error)
        })
      }).catch((error) => {
        console.log(error)
      })
    }
  }

  render() {
    return (
      <>
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
        <div className="users-list">
          <h1>Lista użytkowników</h1>
          {
            this.state.users.map((user, index) => {
              return (
                <div className="user-container">
                  <h2>Użytkownik nr: {index + 1}</h2>
                  <h3>Imię: {user.name}</h3>
                  <h3>Nazwosko: {user.surname}</h3>
                  <h4>Email: {user.email}</h4>
                  <h4>Telefon: {user.phone}</h4>
                  <button onClick={() => this.changePersonalData(user.id)}>Zmień dane</button>
                  <button onClick={() => this.removeUser(user.id)}>Usuń użytkownika</button>
                </div>
              )
            })
          }
        </div>
      </>
    )
  }

}

export default App;
