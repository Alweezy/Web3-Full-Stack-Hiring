import React from "react";
import axios from "axios";

import NumberFormat from 'react-number-format';

import "./styles/converter.css";
class Converter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fromCurrency: 'USD',
            toCurrency: 'USD',
            amount: 1,
            currencies: [],
            rates: {},
            foreignRate: 1
        };

        this.OEXRatesappId = `658cb20434104edbaade6af0077fc21a`
        this.handleConvert = this.handleConvert.bind(this)
    }

    async componentDidMount() {
        try {
            const {data} = await axios.get(`https://openexchangerates.org/api/currencies.json`)
            const currencyAr = [];
            for(const key in data) {
                currencyAr.push(key);
            }
            this.setState({ currencies: currencyAr });
        } catch (error) {
            console.error(`Error: There was a problem fetching currencies: ${error}`)
        }

        try {
            const {data: exChange } = await axios.get(`https://openexchangerates.org/api/latest.json?app_id=${this.OEXRatesappId}`)
            this.setState({rates: exChange.rates})
        } catch (error) {
            console.error(`Error: There was a problem fetching current rates: ${error}`);
        }
    }

    handleConvert = (data) => {
        const newRate = this.state.rates[data]
        this.setState({foreignRate : newRate})
    };
    handleSelect = event => {
        this.setState({ toCurrency: event.target.value });
        const newCurrency = event.target.value
        this.handleConvert(newCurrency)
    };

    render() {
        return (
            <div className="Converter">
                <h2>
                    <span>CONVERT </span>TO OTHER CURRRENCIES
                    <span role="img" aria-label="money">&#x1f4b5;</span>
                </h2>
                <div className="From">
                    <select
                        name="to"
                        onChange={event => this.handleSelect(event)}
                        value={this.state.toCurrency}>{this.state.currencies.map(cur => (<option key={cur}>{cur}</option>))}
                    </select>
                </div>
                <div className="Balance">
                    <h3><NumberFormat
                        value={(this.props.balance * this.state.foreignRate).toFixed(2)}
                        className="Balance"
                        displayType="text"
                        thousandSeparator={true}
                        prefix={this.state.toCurrency}
                    /></h3>
                </div>
            </div>
        );
    }
}
export default Converter;
