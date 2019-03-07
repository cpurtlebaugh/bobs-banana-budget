import React, { Component } from 'react';
import {FormGroup, Form, Col, Row, Button} from 'reactstrap';
import FormInput from "./FormInput";
import axios from "axios";

class FormView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numberOfDays: 0,
            startDate: ""
        }

        this.inputCb = this.inputCb.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    inputCb = (dataFromChild, name) => {
        if(name === "startDate"){
            // add validation check
            this.setState({startDate: dataFromChild})
        } else {
            // add validation check
            this.setState({numberOfDays: dataFromChild})
        }
    }

    async submitForm(e) {
        try {
            e.preventDefault();
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

        } catch (err){
            throw new Error("There was an issue submitting your banana request.")
        }
    }

    render() {
        return (
            <Form>
                Number of days: {this.state.numberOfDays}
                <br/>
                Start Date: {this.state.startDate}
                <br/>
                <Row>
                    {/* # of days */}
                    <Col xs="5">
                        <FormInput inputCb={this.inputCb} placeholder="Number Of Days" name="numberOfDays"/>
                    </Col>

                    <Col xs="5">
                        {/* start date */}
                        <FormInput inputCb={this.inputCb} placeholder="MM/DD/YYYY" name="startDate" />        
                    </Col>

                    {/* submit */}
                    <Col xs="2">
                        <FormGroup>
                            <Button onClick={this.submitForm.bind(this)}>Submit</Button>
                        </FormGroup>
                    </Col>
                </Row>
            </Form>
        );
    }
}

export default FormView;
