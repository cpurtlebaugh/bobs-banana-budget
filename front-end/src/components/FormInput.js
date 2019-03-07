import React, { Component } from 'react';
import { FormGroup, Input } from 'reactstrap';


class FormInput extends Component {
  constructor(props) {
    super(props);
    this.state ={
      value: ""
    }
    
    this.handleInputValue     = this.handleInputValue.bind(this);
  }
  

  handleInputValue(e){
    console.log("e: ", e.target.name)
    this.setState({
        value: e.target.value
    });
    this.props.inputCb(e.target.value, e.target.name)
  };

  render() {
    return (
        <FormGroup>                  
          <Input type="text" placeholder={this.props.placeholder} name={this.props.name} value={this.state.value} onChange={this.handleInputValue} />                
        </FormGroup>
    );
  }
}

export default FormInput;
