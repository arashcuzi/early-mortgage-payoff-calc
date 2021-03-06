import React, { Component } from 'react';
import { validateFields, monthlyPayment, mortgageComponentsBuilder } from './utils/utils';
import Snackbar from 'material-ui/Snackbar';
import FormChart from './components/formChart/';
import logo from './logo.svg';
import './App.css';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class App extends Component {
  componentWillMount() {
    this.state = {
      salary: '55000',
      taxRatio: '30',
      saveRate: '70',
      homeCost: '150000',
      yearsBorrowed: '15',
      mortgageInterest: '2.8',
      investmentRate: '8',
      mortgageValues: []
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const key = event.target.id;
    const val = event.target.value;

    this.setState({
      [key]: val
    });
  }

  render() {
    const showValidate = !validateFields(this.state);
    const mortgagePayment = monthlyPayment(this.state);
    const mortgageComponents = mortgageComponentsBuilder(this.state);
    console.log(mortgagePayment, showValidate, mortgageComponents);

    return (
      <div className='App'>
        <div className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h2>Early Mortgage Payoff Calculator</h2>
        </div>
        <p className='App-intro'>
          Fill in the following
        </p>
        <FormChart state={this.state} handleChange={this.handleChange} mortgageComponents={mortgageComponents} />
        <Snackbar
          open={showValidate}
          message='Please verify your entries, a valid calculation cannot be computed.'
          autoHideDuration={100000}
        />
      </div>
    );
  }
}

export default App;
