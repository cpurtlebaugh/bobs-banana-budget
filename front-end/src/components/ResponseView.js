import React, { Component } from 'react';
import { Container, Col, Row } from 'reactstrap';

class ResponseView extends Component {
    constructor(props) {
        super(props);
        this.state ={
        }
    }

    render() {
      return (
          <Container>
              <Row>
                  {/* # of days */}
                  <Col xs={5}>
                      <p>Number Of Days: {this.props.numberOfDays}</p>
                  </Col>

                  <Col xs={5}>
                      <p>Total Cost: {this.props.response.totalCost}</p>       
                  </Col>
              </Row>
          </Container>
      );
    }
}

export default ResponseView;
