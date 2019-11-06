import React from 'react';
import {Link} from "react-router-dom"
import {loginUser, updateState, resetFields} from "./../daffy_duck/loginRegisterReducer"
import {connect} from "react-redux";
import "./sass/login.css"

class Login extends React.Component {

        state = {
            error: false
        }

        handleChange = e => {
            this.props.updateState({[e.target.name]: e.target.value})
        }
        
        handleClick = (e) => {
            e.preventDefault();
            this.props.loginUser(this.props.username, this.props.password)
            .then(() => {
                // alert("Correct")
                this.props.history.push("/Profile")
                this.props.resetFields()
            })
            .catch(() =>{
                this.setState({error: true})
                // this.props.resetFields()
            })
        }

    render(){
        // console.log(this.props.username)
        return (
    
            <div className="main">
            <h1>Login</h1>
            <input placeholder="Enter username" name="username" onChange={this.handleChange}></input>
            <input placeholder="Enter password" name="password" onChange={this.handleChange} type="password"></input>
            <Link to="/Profile">
            <button onClick={this.handleClick}>Login</button>
            </Link>
            <Link to="/Register">
            <button>Register</button>
            </Link>
            {this.state.error === true ? <h1>Incorrect login</h1>: null}
            </div>
        )
    }

}

const mapStateToProps = reduxState => {
    return {
        username: reduxState.loginRegisterReducer.username,
        password: reduxState.loginRegisterReducer.password
    }
}

export default connect(mapStateToProps, {updateState, loginUser, resetFields})(Login);