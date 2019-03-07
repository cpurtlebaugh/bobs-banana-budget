import React, { Component } from 'react';
import { FormGroup, Form, Col, Row, Button, Alert } from 'reactstrap';
import FormInput from "./FormInput";
import axios from "axios";
const dateRegex = /^(0?[1-9]|1[0-2])\/(0?[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
const numberRegex = /^\d+$/;

class FormView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numberOfDays: 0,
            startDate: "",
            invalidDate: false,
            error: false,
        }

        this.inputCb = this.inputCb.bind(this);
        this.validate = this.validate.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }
    
    inputCb = (dataFromChild, name) => {
        if(name === "startDate"){
            this.validate(dataFromChild, dateRegex) ? this.setState({startDate: dataFromChild}) : this.setState({invalidDate: true, error: true});
        } else {
            this.validate(dataFromChild, numberRegex) ? this.setState({numberOfDays: dataFromChild}) : this.setState({error: true});
        }
    }

    validate(val, regex) {
        return regex.test(val);
    }

    onDismiss() {
        this.setState({ error: false });
    }
    
    async submitForm(e) {
        try {
            if( !this.state.error ) {
                const config = {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Access-Control-Allow-Origin': '*'
                };
    
                const requestBody = {
                    startDate: this.state.startDate,
                    numberOfDays: this.state.numberOfDays
                }
                
                const url = 'http://localhost:8000/api/v1/budget';
                const response = await axios.post(url, requestBody, config);
    
                if(response.data.success) {
                    this.props.showViewCb(response.data, this.state.numberOfDays)
                };
            } 
        } catch (err){
            throw new Error("There was an issue submitting your banana request.")
        }
    }

    render() {
        return (
            <Form>
                <Row>
                    {/* # of days */}
                    <Col md={6} xs={6}>
                        <FormInput inputCb={this.inputCb} placeholder="Number Of Days" name="numberOfDays"/>
                    </Col>

                    <Col md={6} xs={6}>
                        {/* start date */}
                        <FormInput inputCb={this.inputCb} placeholder="MM/DD/YYYY" name="startDate" />        
                    </Col>

                    {/* submit */}
                    <Col md={{size: 2, offset: 5}} xs={{size: 4, offset: 4}}>
                        <FormGroup>
                            <Button onClick={this.submitForm.bind(this)}>Submit</Button>
                        </FormGroup>
                    </Col>
                </Row>

                <Alert color="danger" isOpen={this.state.error} toggle={this.onDismiss}>
                    { this.state.invalidDateMsg
                      ? "Invalid date (MM/DD/YYYY)."
                      : "Please provide a valid number."
                    }
                </Alert>
            </Form>
        );
    }
}

export default FormView;
