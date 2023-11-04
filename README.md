# Decentralized Autonomous Organization (DAO) Smart Contract

A decentralized application (DApp) for managing a Decentralized Autonomous Organization (DAO) using Ethereum smart contracts.

## Table of Contents

- [Description](#description)
- [Smart Contract](#smart-contract)
- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Description

This project provides a smart contract written in Solidity that allows you to create and manage a Decentralized Autonomous Organization (DAO). DAOs are blockchain-based organizations with transparent and decentralized decision-making processes.

## Smart Contract

The core of this project is the `Dao.sol` smart contract. The contract includes several key features and functionalities:

- **Contributions:** Investors can contribute funds to the DAO, receiving shares in return.

- **Redeem Shares:** Investors can redeem their shares and withdraw their contributions.

- **Transfer Shares:** Investors can transfer shares to other addresses.

- **Create Proposals:** Investors can create proposals for the allocation of DAO funds.

- **Vote on Proposals:** Investors can vote on proposals to approve or reject them.

- **Execute Proposals:** The contract owner can execute proposals if they meet the quorum requirements.

## Features

- Decentralized decision-making.
- Quorum-based proposal execution.
- Share management for investors.
- Contribution and withdrawal mechanisms.
- Ethereum-based smart contract.

## Requirements

- Solidity (v0.8.0)
- Ethereum development environment
- Truffle
- Open Ganache in the background

## Installation

1. Clone the repository:

   ```shell
   git clone https://github.com/gkirat/DAO-Dapp.git

2. Navigate to the project directory:
   
   ```shell
   cd DAO-Dapp

3. Deploy the contract
      ```shell
   truffle migrate
4. Navigate to the project directory:
   ```shell
   cd client
5. Install required dependencies:
   ```shell
   npm install

6. Install required dependencies:
   ```shell
   npm start

## Usage
- Deploy the Dao.sol smart contract to the ganache local blockchain.
- Interact with the contract using a web3.js library.
- Follow the contract's functions to contribute, redeem shares, create/vote on proposals, and execute proposals.


## Contributing

Contributions to this project are welcome. You can contribute by:

- Forking the repository
- Creating a new branch for your changes
- Making your changes
- Committing and pushing your changes
- Creating a pull request

## License

[License](License)
