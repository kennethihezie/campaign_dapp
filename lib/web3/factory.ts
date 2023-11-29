import web3 from './web3'

const contractAddress = '0x3b25194228E6a836487952C87d50d664A4E8DE34';

const abi: any = [
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "minimumContribution",
          "type": "uint256"
        }
      ],
      "name": "createCampaign",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getAllDeployedContracts",
      "outputs": [
        {
          "internalType": "address[]",
          "name": "",
          "type": "address[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
]

export default new web3.eth.Contract(abi, contractAddress)
