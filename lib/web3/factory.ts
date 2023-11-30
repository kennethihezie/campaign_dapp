import web3 from './web3'

const contractAddress = '0x613ec2803dE92731be522e662D39c7863DA4d608';

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
