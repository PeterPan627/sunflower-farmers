import { Contract } from 'web3-eth-contract';
import Web3 from 'web3';

import Token from '../abis/Token.json'
import Farm from '../abis/Farm.json'
import { TokenInstance } from '../../types/truffle-contracts/Token'
import { FarmInstance } from '../../types/truffle-contracts/Farm'

import { Transaction, Square, Charity  } from './types/contract'

interface TokenContract extends Contract {
  methods: TokenInstance
}

interface FarmContract extends Contract {
  methods: FarmInstance
}

interface Account {
    farm: Square[]
    balance: number
}

export class BlockChain {
    private web3: Web3 | null = null
    private token: any | null = null
    private farm: any | null = null
    private account: string | null = null
    private details: Account = null

    private events: Transaction[] = []

    private async connectToGanache() {
        // const netId = await this.web3.eth.net.getId();
        // console.log({ netId })
        // const accounts = await this.web3.eth.requestAccounts()
        // this.account = accounts[0]

        // console.log({ netId })
        // this.token = new this.web3.eth.Contract(Token.abi as any, Token.networks[netId].address)

        // const farmAddress = Farm.networks[netId].address
        // this.farm = new this.web3.eth.Contract(Farm.abi as any, farmAddress)
    }

    private async connectToMatic(){

        // web3.eth.defaultAddress = '0xd94A0D37b54f540F6FB93c5bEcbf89b84518D621'
        // web3.eth.handleRevert = true

        this.token = new this.web3.eth.Contract(Token as any, '0x8B0e84C5D75C9b489119bde5fA9136212C7e86A8')
        this.farm = new this.web3.eth.Contract(Farm as any, '0x84a23593ba916aDACA311A19a0648e6f8cc90612')

        const maticAccounts = await this.web3.eth.getAccounts()
        this.account = maticAccounts[0]
    }

    private async connectToHarmony(){
        // this.token = new this.web3.eth.Contract(Token.abi as any, '0xCFc5b0e65f9a684C0180037eef201EF025D37971')
        // this.farm = new this.web3.eth.Contract(Farm.abi as any, '0x1ecE946c332C9AffC28b82D73B720Ac9D984f5fF')

        // const maticAccounts = await this.web3.eth.getAccounts()
        // this.account = maticAccounts[0]
    }

    private async connectToBinance(){
        // this.token = new this.web3.eth.Contract(Token.abi as any, '0xCFc5b0e65f9a684C0180037eef201EF025D37971')
        // this.farm = new this.web3.eth.Contract(Farm.abi as any, '0x1ecE946c332C9AffC28b82D73B720Ac9D984f5fF')

        // const maticAccounts = await this.web3.eth.getAccounts()
        // this.account = maticAccounts[0]
    }


    public get isConnected() {
        return !!this.farm
    }

    public get hasFarm() {
        return this.details && this.details.farm.length > 0
    }

    private async setupWeb3() {
        if ((window as any).ethereum) {
            try{
                // Request account access if needed
                await (window as any).ethereum.enable();
                this.web3 = new Web3((window as any).ethereum);
            }
            catch (error) {
                // User denied account access...
                console.error(error)
            }
        } else if ((window as any).web3) {
            this.web3 = new Web3((window as any).web3.currentProvider);
        } else {
            throw new Error('NO_WEB3')
        }
    }

    public async initialise() {
        try {
            await this.setupWeb3()
            const chain = await this.web3.eth.net.getNetworkType()
            const chainId = await this.web3.eth.getChainId()

            console.log({ chain })
            console.log({ chainId })
            if (chainId === 80001) {
                await this.connectToMatic()

                this.details = await this.getAccount()
            } else if (chainId === 1666700000) {
                await this.connectToHarmony()

                this.details = await this.getAccount()
            } else if (chainId === 97) {
                await this.connectToBinance()

                this.details = await this.getAccount()
            }else {
                throw new Error('WRONG_CHAIN')
            }
            console.log('Resolved')
        }catch(e) {
            console.error(e)
            throw e
        }
    }

    public createFarm(charity: Charity) {
        const value = this.web3.utils.toWei('0.01', 'ether')

        return new Promise((resolve, reject) => {
            this.farm.methods.createFarm(charity).send({from: this.account, value, to: charity })
            .on('error', function(error){
                console.log({ error })

                reject(error)
            })
            .on('transactionHash', function(transactionHash){
                console.log({ transactionHash })
            })
            .on('receipt', function(receipt) {
                console.log({ receipt })
                resolve(receipt)
            })
        })
    }

    public save() {
        const blockChain = this

        return new Promise((resolve, reject) => {
            this.farm.methods.sync(this.events).send({from: this.account})
                .on('error', function(error){
                    console.log({ error })
                    // User rejected
                    if (error.code === 4001) {
                        return resolve(null)
                    }

                    blockChain.events = []
                    reject(error)
                })
                .on('transactionHash', function(transactionHash){
                    console.log({ transactionHash })
                })
                .on('receipt', function(receipt) {
                    console.log({ receipt })
                    blockChain.events = []
                    resolve(receipt)
                })
        })

    }

    public levelUp() {
        return new Promise((resolve, reject) => {
            this.farm.methods.levelUp().send({from: this.account})
            .on('error', function(error){
                console.log({ error })
                // User rejected
                if (error.code === 4001) {
                    return resolve(null)
                }
                reject(error)
            })
            .on('transactionHash', function(transactionHash){
                console.log({ transactionHash })
            })
            .on('receipt', function(receipt) {
                console.log({ receipt })
                resolve(receipt)
            })
            console.log('Done')
        })
    }

    public async getAccount(): Promise<Account> {
        if (!this.web3) {
            return {
                farm: [],
                balance: 0,
            }
        }

        const rawBalance = await this.token.methods.balanceOf(this.account).call({ from: this.account })
        const farm = await this.farm.methods.getLand().call({ from: this.account })
        
        const balance = this.web3.utils.fromWei(rawBalance.toString())
        return {
            balance: Number(balance),
            farm,
        }

    }

    public async getMarketConversion(): Promise<number> {
        return await this.farm.methods.getMarketPrice(1).call({ from: this.account })
    }

    public getWeb3() {
        return this.web3
    }

    public addEvent(event: Transaction) {
        this.events = [...this.events, event]
    }

    public isUnsaved() {
        return this.events.length > 0
    }

    public lastSaved() {
        if (this.events.length === 0) {
            return null
        }

        return this.events[0].createdAt
    }

    public async totalSupply(): Promise<number> {
        if (!this.web3 || !this.token) {
            return 0
        }

        const totalSupply = await this.token.methods.totalSupply().call({ from: this.account })

        const supply = this.web3.utils.fromWei(totalSupply)

        return Number(supply)
    }

    public async getCharityBalances() {
        console.log('Try get balances')
        const coolEarth = this.web3.eth.getBalance(Charity.CoolEarth)
        const waterProject = this.web3.eth.getBalance(Charity.TheWaterProject)
        const heifer = this.web3.eth.getBalance(Charity.Heifer)
        const [coolEarthBalance, waterBalance, heiferBalance] = await Promise.all([coolEarth, waterProject, heifer])
        console.log({ coolEarthBalance })

        return {
            coolEarthBalance: this.web3.utils.fromWei(coolEarthBalance, "ether"),
            waterBalance: this.web3.utils.fromWei(waterBalance, "ether"),
            heiferBalance: this.web3.utils.fromWei(heiferBalance, "ether"),
        }
    }
}
