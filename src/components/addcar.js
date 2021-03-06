import React from 'react';
import {Link} from 'react-router-dom'
import {storage} from "./../firebase-config";
import firebase from 'firebase';
import {updateState} from "./../daffy_duck/garageReducer";
import Axios from 'axios';
import {connect} from 'react-redux'

class AddCar extends React.Component {
    constructor(){
        super()


        this.state = {
            carUrl: ""
        }
    }

    handleChange = (e) => {
        this.props.updateState({[e.target.name]: e.target.value})
    }

    handleCar = (e) => {
        if(e.target.files[0]){
            const image = (e.target.files[0])
            const uploadTask = storage.ref(`car/${image.name}`).put(image)
            uploadTask.on("state_changed", 
            () =>{
                storage.ref('car').child(image.name).getDownloadURL()
                .then(url => {
                    this.setState({carUrl: url})
                })
            }
            
            )
        }
    }

    submitCar = (e) => {
        e.preventDefault();
        Axios.post("/garage/add", {
            make: this.props.make,
            model: this.props.model,
            image: this.state.carUrl,
            year: this.props.year
        })
        this.props.history.push("/Garage")
    }

    render() {
        return (
            <div className="main">
                <div className="header">
                    <p id="logo">Fracebok</p>
                </div>
                <form className="editProfileCard">
                    <input placeholder="Enter Make" name="make" onChange={this.handleChange}></input>
                    <input placeholder="Enter Model" name="model" onChange={this.handleChange}></input>
                    <input placeholder="Enter Year" name="year" onChange={this.handleChange}></input>
                    <input type="file" placeholder="Add image" onChange={this.handleCar} name="image"></input>
                        <button onClick={this.submitCar}>Add Car</button>
                    <Link to="/Garage">
                        <button>Back to Garage</button>
                    </Link>
                </form>
            </div>
        )
    }
}


const mapStateToProps = reduxState => {
    return {
        make: reduxState.GarageReducer.make,
        model: reduxState.GarageReducer.model,
        image: reduxState.GarageReducer.image,
        year: reduxState.GarageReducer.year
    }
}

export default connect(mapStateToProps, {updateState})(AddCar);