import React, { Component } from 'react';
import { variables } from './Variables';

class AdminLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalTitle: "",
      Userid: "",
      Password: "",
      RetypePassword: "",
    };
  }

  refreshList(){

    fetch(variables.API_URL+'Cred')
    .then(response=>response.json())
    .then(data=>{
        this.setState({admin:data});
    });
}

componentDidMount(){
    this.refreshList();
}

  changeUserid = (e) => {
    this.setState({ Userid: e.target.value });
  };

  changePassword = (e) => {
    this.setState({ Password: e.target.value });
  };

  changeRetypePassword = (e) => {
    this.setState({ RetypePassword: e.target.value });
  };

  regClick = () => {
    this.setState({
      modalTitle: "Register",
      Userid: "",
      Password: "",
      RetypePassword: ""
    });
  };

  logClick = () => {
    this.setState({
      modalTitle: "Login",
      Userid: "",
      Password: "",
      RetypePassword: ""
    });
  };

  createClick = () => {
    const { Userid, Password, RetypePassword } = this.state;
  
    if (Password !== RetypePassword) {
      alert("Password and Retype Password do not match.");
      return;
    }
  
    fetch(variables.API_URL + 'Cred', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Userid: Userid,
        Password: Password,
        RetypePassword: RetypePassword,
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Failed to add data.');
        }
      })
      .then((result) => {
        alert(result);
        this.refreshList();
      })
      .catch(error => {
        alert(error.message);
      });
  };
  

  loginClick = () => {
    const { Userid, Password } = this.state;

    fetch(`${variables.API_URL}Cred/${Userid}/${Password}`)
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          alert('Login successful');
          window.location.replace('/AdminDash');
        } else {
          alert('Invalid credentials. Please try again.');
        }
      })
      .catch(error => {
        console.log(error);
        alert('An error occurred. Please try again.');
      });
  };

  render() {
    const {
      modalTitle,
      Userid,
      Password,
      RetypePassword
    } = this.state;

    return (
      <div>
        <h3>This is Admin Login</h3>

        <button
          type='button'
          className='btn btn-primary m-2 float-middle'
          data-bs-toggle='modal'
          data-bs-target='#exampleModal'
          onClick={this.regClick}
        >
          Register as Admin
        </button>

        <br />

        <button
          type='button'
          className='btn btn-primary m-2 float-middle'
          data-bs-toggle='modal'
          data-bs-target='#exampleModal'
          onClick={this.logClick}
        >
          Login as Admin
        </button>

        <div className='modal fade' id='exampleModal' tabIndex='-1' aria-hidden='true'>
          <div className='modal-dialog modal-lg modal-dialog-centerd'>
            <div className='modal-content'>
              <div className='model-header'>
                <h5 className='model-title'>{modalTitle}</h5>
                <button type='button' className='btn-close' data-bs-dismiss='model' aria-label='Close'></button>
              </div>
              <div className='modal-body'>
                <div className='input-group mb-3'>
                  <span className='input-group-text'>User ID</span>
                  <input type='text' className='form-control' value={Userid} onChange={this.changeUserid}></input>
                </div>

                <div className='input-group mb-3'>
                  <span className='input-group-text'>Password</span>
                  <input type='password' className='form-control' value={Password} onChange={this.changePassword}></input>
                </div>

                {modalTitle === 'Register' && (
                  <div className='input-group mb-3'>
                    <span className='input-group-text'>Retype Password</span>
                    <input type='password' className='form-control' value={RetypePassword} onChange={this.changeRetypePassword}></input>
                  </div>
                )}

                <div className='input-group mb-3'>
                  {modalTitle === 'Register' && (
                    <button type='button' className='btn btn-primary float-start' onClick={this.createClick}>
                      Register
                    </button>
                  )}

                  {modalTitle === 'Login' && (
                    <button type='button' className='btn btn-primary float-start' onClick={this.loginClick}>
                      Login
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export { AdminLogin };
