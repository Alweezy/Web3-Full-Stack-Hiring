import React from 'react'
import Web3 from 'web3'
import daiABI from './../abi/dai'
import Converter from './Converter'

const gateWayUrl = 'https://mainnet.infura.io/v3/5589b5c0d0804cdb831a3d5c44fada90'

class Balance extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            balance: '',
            address: '',
            errorMessage: ''
        }

        this.checkBalance = this.checkBalance.bind(this)
        this.handleInPutChanged = this.handleInPutChanged.bind(this)
    }

    componentDidMount() {
    }

    handleInPutChanged (e) {
        this.setState({address: e.target.value})
    }

    async checkBalance () {
        try {
            const provider = new Web3.providers.HttpProvider(gateWayUrl)
            const web3 = new Web3(provider);
            const daiContractAddress = "0x6b175474e89094c44da98b954eedeac495271d0f";
            const daiContract = new web3.eth.Contract(daiABI, daiContractAddress);
            // const daiWhale = "0xF977814e90dA44bFA03b6295A0616a897441aceC";
            const daiWalletAddress = this.state.address;
            const daiBalance = await daiContract.methods.balanceOf(daiWalletAddress).call()
            this.setState({balance:  web3.utils.fromWei(daiBalance, 'ether')})
            this.setState({errorMessage: ''})
        } catch (error) {
            this.setState({errorMessage: error.message})
        }
    }


    inputStyles = {
        backgroundColor: "#005A9C",
        color: "white",
        marginTop: "20px",
        width: "90%",
        height: "40px",
        fontSize: "22px"
    }

    buttonStyles = {
        marginTop:"50px",
        padding: "10px",
        borderRadius: "10px",
        backgroundColor: "Blue",
        font: "Roboto",
        color: "white",
    }

    labelStyles = {
        marginTop: "20px",
        fontSize: "30px"
    }

    errorMessageStyles =  {
        color: "red",
        width: "90%",
        marginLeft: "10px",
        padding: "20px",
        backgroundColor: "white",
        border: "2px solid white",
        font: "Roboto"
    }

    render(){
        return (
            <div>
                {this.state.errorMessage && <p style={this.errorMessageStyles}>{this.state.errorMessage}</p>}
                <div style={this.labelStyles}>
                    {!this.state.address && <label htmlFor="address">ENTER ADDRESS BELOW:</label>}
                </div>
                <input placeholder="eg  0x28C6c0..." style={this.inputStyles} id="address" type="text" onChange={ this.handleInPutChanged} value={this.state.address}/>
                <button style={this.buttonStyles} onClick={this.checkBalance} type="button">CHECK BALANCE</button>
                <Converter balance={this.state.balance}/>
                {this.state.balance && <h4 style={{color: "white"}}>Last Queried Address: {this.state.address}</h4>}
            </div>
        )
    }
}

export default Balance
