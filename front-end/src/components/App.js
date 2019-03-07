import React, { Component } from 'react';
import FormView from "./FormView";
import ResponseView from "./ResponseView"
import { Container } from 'reactstrap';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


class App extends Component {
    constructor(props) {
        super(props);
          this.state = {
              response: {
                success: false,
                totalCost: 0
              },
              numberOfDays: 0
        }

        this.showViewCb = this.showViewCb.bind(this);
    }

    showViewCb(response, numberOfDays){
        this.setState({
            response,
            numberOfDays
        });
    };

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <p>
                      BOB'S BANANA BUDGET
                    </p>
                    <iframe title="sillygiphy" src="https://giphy.com/embed/l4pT5SarS5UVMQDzG"  frameBorder="0" className="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/animation-loop-3d-l4pT5SarS5UVMQDzG"></a></p>
                </header>

                <Container className="App-container">
                    { this.state.response.success
                      ? <ResponseView response={this.state.response} numberOfDays={this.state.numberOfDays}/>
                      : <FormView showViewCb={this.showViewCb}/>
                    }
                </Container>
            </div>
          );
    }
}

export default App;
