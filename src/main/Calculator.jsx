import React, { Component } from 'react';
import './Calculator.css';

import Button from '../components/Button'
import Display from '../components/Display'

const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
}

export default class Calculator extends Component {
    //estado inical da calculadora
    state = { ...initialState }

    constructor(props) {
        super(props);

        this.clearMemory = this.clearMemory.bind(this);
        this.setOperation = this.setOperation.bind(this);
        this.addDigit = this.addDigit.bind(this);

    }

    clearMemory() {
        this.setState({ ...initialState });
    }
    setOperation(operation) {
        //se o valor for 0, muda o current para 1 e seta para limpar o display
        if (this.state.current === 0) {
            this.setState({ operation, current: 1, clearDisplay: true });
        } else {//conclui a operação
            const equals = operation === '=';
            const currentOpertion = this.state.operation;

            const values = [...this.state.values];
            switch (currentOpertion) {
                case '+':
                    values[0] = values[0] + values[1];
                    break;
                case '/':
                    values[0] = values[0] / values[1];
                    break;
                case '*':
                    values[0] = values[0] * values[1];
                    break;
                case '-':
                    values[0] = values[0] - values[1];
                    break;
            }

            values[1] = 0;

            this.setState({
                displayValue: values[0],
                operation: equals ? null : operation,
                current: equals ? 0 : 1,
                clearDisplay: !equals,
                values
            });
        }
    }
    addDigit(n) {
        //evita mais de um "."
        if (n === '.' && this.state.displayValue.includes('.')) return;

        //retira o zero à esquerda
        const clearDisplay = this.state.displayValue === '0'
            //se estiver setado para limpar o display
            || this.state.clearDisplay

        //se estiver setado para limpar o display, entao limpa
        const currentValue = clearDisplay ? '' : this.state.displayValue;

        //concatena o valor atual do display com o digito inserido pelo usuario
        const displayValue = currentValue + n;

        this.setState({ displayValue, clearDisplay: false });

        //se for um digito, insere o valor do display e insere em array current (0 ou 1)
        if (n !== '.') {
            const i = this.state.current;
            const newValue = parseFloat(displayValue);
            const values = [...this.state.values];
            values[i] = newValue;

            this.setState({ values });
            // console.log(values);
        }
    }

    render() {
        return (
            <div className="calculator">
                <Display value={this.state.displayValue} />
                <Button label="AC" click={this.clearMemory} triple />
                <Button label="/" click={this.setOperation} operation />
                <Button label="7" click={this.addDigit} />
                <Button label="8" click={this.addDigit} />
                <Button label="9" click={this.addDigit} />
                <Button label="*" click={this.setOperation} operation />
                <Button label="4" click={this.addDigit} />
                <Button label="5" click={this.addDigit} />
                <Button label="6" click={this.addDigit} />
                <Button label="-" click={this.setOperation} operation />
                <Button label="1" click={this.addDigit} />
                <Button label="2" click={this.addDigit} />
                <Button label="3" click={this.addDigit} />
                <Button label="+" click={this.setOperation} operation />
                <Button label="0" click={this.addDigit} double />
                <Button label="." click={this.addDigit} />
                <Button label="=" click={this.setOperation} operation />
            </div>
        )
    }
}