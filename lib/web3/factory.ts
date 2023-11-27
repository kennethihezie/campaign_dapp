import web3 from './web3'

const contractAddress = '0x3ed2F1C3c1c95A6Ac83569918d3b9F0dc540AECd';

const abi: any = [
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "minimumContribution",
          "type": "uint256"
        }
      ],
      "name": "deployContract",
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
