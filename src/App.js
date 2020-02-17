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
    users: [],
    changeName: {
      value: ""
    },
    changeSurname: {
      value: ""
    },
    changeEmail: {
      value: ""
    },
    changePhone: {
      value: ""
    },
    index: null
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

  editUserData = (userId) => {
    for (let i = 0; i < this.state.users.length; i++) {
      if (this.state.users[i].id === userId) {
        this.setState({
          changeName: {
            value: this.state.users[i].name
          },
          changeSurname: {
            value: this.state.users[i].surname
          },
          changeEmail: {
            value: this.state.users[i].email
          },
          changePhone: {
            value: this.state.users[i].phone
          },
          index: userId
        })
        console.log(this.state.users[i].id)
        console.log(userId)
      }
    }
  }

  sendChangedData = (userId) => {
    console.log(this.state.changeName.value)
    Axios.put(`http://localhost:3000/users/${userId}`, { name: this.state.changeName.value, surname: this.state.changeSurname.value, email: this.state.changeEmail.value, phone: this.state.changePhone.value }).then((response) => {
      console.log(response)
      Axios.get("http://localhost:3000/users").then((response) => {
        this.setState({
          users: response.data,
          index: null
        })
      }).catch((error) => {
        console.log(error)
      })
    }).catch((error) => {
      console.log(error)
    })
  }

  removeUser = (userId) => {
    Axios.delete(`http://localhost:3000/users/${userId}`).then((response) => {
      Axios.get("http://localhost:3000/users").then((response) => {
        this.setState({
          users: response.data,
          index: null
        })
      }).catch((error) => {
        console.log(error)
      })
    }).catch((error) => {
      console.log(error)
    })
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
                <React.Fragment key={index}>
                  {this.state.index !== user.id ? <div className="user-container">
                    <h2>Użytkownik nr: {index + 1}</h2>
                    <h3>Imię: {user.name}</h3>
                    <h3>Nazwisko: {user.surname}</h3>
                    <h4>Email: {user.email}</h4>
                    <h4>Telefon: {user.phone}</h4>
                    <button onClick={() => this.editUserData(user.id)}>Zmień dane</button>
                    <button onClick={() => this.removeUser(user.id)}>Usuń użytkownika</button>
                  </div> :
                    <div className="changeData-container">
                      <h2>Użytkownik nr: {user.id}</h2>
                      <label>Imię
<input type="text" name="changeName" value={this.state.changeName.value} onChange={this.handleChange} ></input></label>
                      <label>Nazwisko
<input type="text" name="changeSurname" value={this.state.changeSurname.value} onChange={this.handleChange} ></input></label>
                      <label>Email
<input type="text" name="changeEmail" value={this.state.changeEmail.value} onChange={this.handleChange} ></input></label>
                      <label>Telefon
<input type="text" name="changePhone" value={this.state.changePhone.value} onChange={this.handleChange} ></input></label>
                      <button onClick={() => this.sendChangedData(user.id)}>Zatwierdź</button>
                    </div>}
                </React.Fragment>
              )
            })
          }
        </div>
      </>
    )
  }

}

export default App;
