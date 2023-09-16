
// SPDX-License-Identifier: GPL-3.0


pragma solidity ^0.8.0;

contract Dao{
  


    struct Proposal{
        uint causeId;
        string causeDescription;
        address payable recipient;
        uint amount;
        uint votes;
        uint endTime;
        bool isExecuted;
    }

    mapping(uint=>Proposal) public proposal;
    mapping(address=>bool) public isInvestor ;  //where address is the address of the investors and bool if they have invested or not 
    mapping(address=>uint) public numOfShare; //If the address has inevsted than how much uint represents how much shares he has
    mapping(address=>mapping(uint=>bool)) private isVoted; //To see if investor has already voted or not 
    mapping(address=>mapping(address=>bool)) public withdrwalStatus; //If some person wants to withdraw money

    // address[] public investorList;
    address[]  investorList;
    Proposal[] public proposalList;

    uint public totalShares;
    uint public totalFunds;
    uint public nextProposalId;
    // uint public totalCollectedFunds;  //In Total funds collected up until date 
    // uint public participationTime;
    // uint public voteTime;
    // uint public quorum;  
    // address public manager;
     uint  participationTime;
    uint  voteTime;
    uint  quorum; 
    address  manager;

    constructor (uint _participationTime,uint _voteTime,uint _quorum){
        require(_quorum >0 && _quorum <100,"The value of quorum should be between 0 and 10.");
        manager = msg.sender ;
        participationTime = block.timestamp + _participationTime;
        voteTime = _voteTime;
        quorum = _quorum; 
    }

    modifier owner{
        require(msg.sender ==  manager,"Only manager can execute this function");
        _;
    }
    modifier onlyInvestor{
        require(isInvestor[msg.sender] == true,"You are not an investor" );
        _;
    }

    function contribuition()external payable {  //1 wei = 1 share
        require(block.timestamp <= participationTime,"Contribuition has ended");
        require(msg.value > 0,"Investment amount should be greater than zero");
        totalFunds += msg.value;
        isInvestor[msg.sender] = true;
        numOfShare[msg.sender]+= msg.value;
        totalShares += msg.value;
        bool alreadyInList = false;
        for(uint i=0;i<investorList.length;i++){
            if(msg.sender == investorList[i]){
                alreadyInList = true;
                break;
            }
        }
        if(alreadyInList == false ){
            investorList.push(msg.sender);
        }
           
    }

    function redeemShare(uint valueToRedeem)external payable onlyInvestor{ //for redeeming the shares
        require(valueToRedeem<=numOfShare[msg.sender],"Amount you entered is invalid , you haven't donated this muchfunds");
        require(totalFunds >= valueToRedeem,"Not suffecient funds");
        numOfShare[msg.sender]-= valueToRedeem;
        if(numOfShare[msg.sender]==0){
            isInvestor[msg.sender]== false;
        }
        totalFunds -= valueToRedeem;
       payable(msg.sender).transfer(valueToRedeem);
    }

    function transfershares(uint amount,address to)public onlyInvestor{
        require(amount <= numOfShare[msg.sender],"Insuffiecent funds");
        require(totalFunds >= amount,"Not suffecient funds");
        numOfShare[msg.sender]-= amount;
        if(numOfShare[msg.sender]==0){
            isInvestor[msg.sender]== false;
        }
        numOfShare[to]+= amount;
        isInvestor[to] = true; 
        // for(uint i=0;i<investorList.length;i++){   // SIR DIDN'T MADE THIS ONE BUT WHY 
        //     if(to != investorList[i]){
        //         investorList.push(to);  
        //     }
        // }
    }

    function createProposal(string  calldata _causeDescriptoin,uint amount,address payable _recipient)public {
        require(amount <= totalFunds,"Insuffienct funds") ;
        proposal[nextProposalId] = Proposal(nextProposalId,_causeDescriptoin,_recipient,amount,0,block.timestamp+voteTime,false);
        proposalList.push(proposal[nextProposalId]);
        nextProposalId++;
    }

    function voteProposal(uint _proposalId)public onlyInvestor {
        require(_proposalId <= nextProposalId,"This proposal does not exist");
        require(isVoted[msg.sender][_proposalId] == false,"You have already voted"); 
        require(proposal[_proposalId].endTime >= block.timestamp,"Voting has ended"); 
        // require(proposal[_proposalId].isExecuted == false,"Funds has been transfered already");
        proposal[_proposalId].votes += numOfShare[msg.sender];
        isVoted[msg.sender][_proposalId] = true;
        proposalList[_proposalId].votes += numOfShare[msg.sender];

    }

    function executeProposal(uint proposalId)public  owner {
        Proposal storage propose = proposal[proposalId];
        require(((propose.votes*100)/totalFunds)>= quorum,"Not greater than the quorum");
        require(propose.isExecuted ==false,"Funds has been already executed");    //Sir didn't include this statement
        require(proposalId <= nextProposalId,"This proposal does not exist");     //Sir didn't include this statement  
        propose.isExecuted = true;
        proposalList[proposalId].isExecuted = true;
        _transfer(propose.amount,propose.recipient);
        // address  toSend = proposal[proposalId].recipient;
        // payable(toSend).transfer(proposal[proposalId].amount);
        // totalFunds -= proposal[proposalId].amount;   
    }

    function _transfer(uint amount, address payable to)internal{
        require(amount <= totalFunds,"Insuffienct funds"); 
        totalFunds -= amount;
        to.transfer(amount); 
    }

    function allow(address to) public owner{
        withdrwalStatus[manager][to] = true;
    }
     function disAllow(address to) public owner{
        withdrwalStatus[manager][to] = false ;
    }

    function withdrawAllEther()public {
        require(withdrwalStatus[manager][msg.sender] == true,"You are not allowed to withdraw");
        // require(numOfShare[msg.sender]<= totalFunds,"We don't have enough funds");
        uint amount = numOfShare[msg.sender];
        numOfShare[msg.sender] = 0;
        _transfer(amount,payable(msg.sender));

    }
    function ProposalList() public view returns(Proposal[] memory){
        return proposalList;
    }


    function InvestorList()public view returns(address[] memory){
        return investorList;
    }
}
