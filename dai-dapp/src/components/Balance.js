import React from 'react'
import Web3 from 'web3'
import daiABI from './../abi/dai'
import Converter from './Converter'

const gateWayUrl = 'https://mainnet.infura.io/v3/5589b5c0d0804cdb831a3d5c44fada90'

class Balance extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            balance: null,
            address: null,
            errorMessage: null,
            hitSearch: false
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
        this.setState({balance: null})
        this.setState({hitSearch: true})
        try {
            const provider = new Web3.providers.HttpProvider(gateWayUrl)
            const web3 = new Web3(provider);
            const daiContractAddress = "0x6b175474e89094c44da98b954eedeac495271d0f"
            const daiContract = new web3.eth.Contract(daiABI, daiContractAddress)
            const daiWalletAddress = this.state.address
            const daiBalance = await daiContract.methods.balanceOf(daiWalletAddress).call()
            this.setState({balance:  web3.utils.fromWei(daiBalance, 'ether')})
            this.setState({errorMessage: ''})
        } catch (error) {
            this.setState({hitSearch: false})
            const errorMessage = error.code === 'INVALID_ARGUMENT' ? 'Ensure address is valid and try again' : error.message
            this.setState({errorMessage: errorMessage})
        }
    }

    render(){
        return (
            <form>
                {this.state.errorMessage && <div className="alert alert-danger" role="alert">{this.state.errorMessage}</div>}
                <label htmlFor="address">Enter Wallet Address and hit search to check balance</label>
                <div className="input-group mb-3">
                    <input onChange={this.handleInPutChanged} id="address" type="text" className="form-control" placeholder="eg 0xd77..."
                           aria-label="Enter Wallet Address and hit search" aria-describedby="basic-addon2"/>
                        <div className="input-group-append">
                            <button onClick={this.checkBalance} className="btn btn-outline-primary" type="button">Search</button>
                        </div>
                </div>
                {!this.state.balance && this.state.hitSearch && <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>}
                {this.state.balance && <Converter balance={this.state.balance}/>}
            </form>
        )
    }
}

export default Balance
