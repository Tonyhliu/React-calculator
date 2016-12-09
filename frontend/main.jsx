import React from 'react';
import ReactDOM from 'react-dom';

class Calculator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstInput: true,
      output: 0,
      firstNumber: 0,
      secondNumber: 0,
      operator: '',
      toggle: true,
      firstCalculate: true
    };

    this._resetCalc = this._resetCalc.bind(this);
    this._addComma = this._addComma.bind(this);
    this._toggleValue = this._toggleValue.bind(this);
    this._convertToNum = this._convertToNum.bind(this);
    this._calculate = this._calculate.bind(this);
  }

  _changeOperator(op) {
    this.setState({ operator: op,
                    firstInput: false });
  }

  _resetCalc() {
    this.setState({ firstInput: true,
                    output: 0,
                    firstNumber: 0,
                    secondNumber: 0,
                    operator: '',
                    toggle: true,
                    firstCalculate: true
                  });
  }

  _calculate() {
    const firstNumber = parseInt(this.state.firstNumber),
          secondNumber = parseInt(this.state.secondNumber);
    if (this.state.operator !== '') {
      switch (this.state.operator) {
        case 'add':
        this.setState({output: firstNumber + secondNumber,
                      lastOperator: 'add',
                      operator: ''});
        break;
        case 'subtract':
        this.setState({output: firstNumber - secondNumber,
                      lastOperator: 'subtract',
                      operator: ''});
        break;
        case 'multiply':
        this.setState({output: firstNumber * secondNumber,
                      lastOperator: 'multiply',
                      operator: ''});
        break;
        case 'divide':
        this.setState({output: firstNumber / secondNumber,
                      lastOperator: 'divide',
                      operator: ''});
        break;
      }
    } else {
        switch (this.state.lastOperator) {
          case 'add':
          this.setState({output: this.state.output + secondNumber});
          break;
          case 'subtract':
          this.setState({output: this.state.output - secondNumber});
          break;
          case 'multiply':
          this.setState({output: this.state.output * secondNumber});
          break;
          case 'divide':
          this.setState({output: this.state.output / secondNumber});
          break;
        }
    }
  }

  _convertToNum(str) {
    return parseInt(str.split(',').join(''));
  }

  _addComma(num) {
    var nf = new Intl.NumberFormat();
    return nf.format(num.split(',').join(''));
  }

  _numberClicked(num) {
    let newNum;
    if (this.state.firstInput) {
      if (this.state.output === 0) { // replace number completely for first number entered
        newNum = num;
        this.setState({ output: newNum.toString() });
      } else { // concatenate number onto number
        newNum = this._addComma(this.state.output.toString() + num);
        this.setState({ output: newNum });
      }
    } else {
      let firstNumber = this.state.output,
          secondNumber = num;

      this.setState({ output: secondNumber,
                      firstNumber: firstNumber,
                      secondNumber: secondNumber });
    }
  }

  _toggleValue() {
    let newNumber;
    if (this.state.toggle) {
      newNumber = '-' + this.state.output;
      this.setState({ output: newNumber,
                      toggle: false });
    } else {
      newNumber = this.state.output.slice(1);
      this.setState({ output: newNumber,
        toggle: true });
    }

  }

  render() {
    return(
      <div className='main-container'>
        <div className='first-row'>
          <div className='output'>{this.state.output}</div>
        </div>

        <div className='second-row'>
          <div className='bl misc numbers'
            onClick={this._resetCalc}>C</div>
          <div className='misc numbers'
            onClick={this._toggleValue}>+/-</div>
          <div className='misc numbers'>%</div>
          <div className='operators divide'
                onClick={this._changeOperator.bind(this, 'divide')}>
                ÷
          </div>
        </div>

        <div className='third-row'>
          <div className='bl numbers'
            onClick={this._numberClicked.bind(this, 7)}>7</div>
          <div className='numbers'
            onClick={this._numberClicked.bind(this, 8)}>8</div>
          <div className='numbers'
            onClick={this._numberClicked.bind(this, 9)}>9</div>
          <div className='operators multiply'
                onClick={this._changeOperator.bind(this, 'multiply')}>x</div>
        </div>

        <div className='fourth-row'>
          <div className='bl numbers'
            onClick={this._numberClicked.bind(this, 4)}>4</div>
          <div className='numbers'
            onClick={this._numberClicked.bind(this, 5)}>5</div>
          <div className='numbers'
            onClick={this._numberClicked.bind(this, 6)}>6</div>
          <div className='operators subtract'
                onClick={this._changeOperator.bind(this, 'subtract')}>-</div>
        </div>

        <div className='fifth-row'>
          <div className='bl numbers'
            onClick={this._numberClicked.bind(this, 1)}>1</div>
          <div className='numbers'
            onClick={this._numberClicked.bind(this, 2)}>2</div>
          <div className='numbers'
            onClick={this._numberClicked.bind(this, 3)}>3</div>
          <div className='operators add'
            onClick={this._changeOperator.bind(this, 'add')}>+</div>
        </div>

        <div className='sixth-row'>
          <div className='bl zero numbers'
            onClick={this._numberClicked.bind(this, 0)}>
            <div className='number-zero'>0</div>
          </div>
          <div className='numbers'
            onClick={this._addDecimal}>.</div>
          <div className='operators equals'
            onClick={this._calculate}>=</div>
        </div>

      </div>
    );
  }
}


document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(<Calculator />, document.getElementById('root'));
});
