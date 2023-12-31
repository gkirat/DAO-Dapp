import { useState, useEffect } from "react";
import Web3 from "web3";
import DAO from "./contracts/DAO.json";
import "./App.css";
import Investors from "./components/Investors/Investors";
import Manager from "./components/Manager/Manager";
import {Taoater, Toaster} from "sonner"

function App() {
  const [state, setState] = useState({
    web3: null,
    contract: null,
  });
  const [account, setAccount] = useState("Not connected");
  const [balance,setBalance]= useState(0)
  const [date,setDate] = useState(new Date().toGMTString())
  
  useEffect(() => {
    async function init() {
      const provider = new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545");
      const web3 = new Web3(provider);
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = DAO.networks[networkId];
      const contract = new web3.eth.Contract(
       DAO.abi,
        deployedNetwork.address
      );
     
      setState({ web3: web3, contract: contract });
    }
    init();
  }, []);

  useEffect(() => {
    const { web3 } = state;
    const allAccounts = async () => {
      var select = document.getElementById("selectNumber");
      var options = await web3.eth.getAccounts();

      for (var i = 0; i < options.length; i++) {
        var opt = options[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
      }
    };
    web3 && allAccounts();
  }, [state]);

  const selectAccount = async () => {
    let selectedAccountAddress = document.getElementById("selectNumber").value;

    if (
      selectedAccountAddress &&
      selectedAccountAddress !== "Choose an account"
    ) {
      setAccount(selectedAccountAddress);
    }
  };

  useEffect(()=>{

    async function bal(){
      const funds = await state.contract.methods.totalFunds().call();
      setBalance(funds)
    }
    state.contract && bal()
  },[state])

  useEffect(()=>{
  const intervalId =  setInterval(()=>{
    setDate(new Date().toGMTString())
  },1000)
  return ()=>clearInterval(intervalId)
  },[])
  // console.log(date)
//code for account balance
  return (
    <div className="App  bg-black flex flex-col justify-center items-center">
   <h1>Decentralize Autonoumous Organization</h1>
   <div id="date">{date} </div>
   <p className="font">Connected Account: {account}</p>
   <p className="font">Available Funds: {balance} WEI</p>
   <form className="label0" id="myForm">
        <label htmlFor=""></label>
        <select className="innerBox" id="selectNumber" onChange={selectAccount}>
          <option align="center">Choose an account</option>
        </select>
      </form>
      <p className="font">For Manager</p>
      <Manager state={state} account={account}></Manager>
      <p className="font">For Investors</p>
     <Investors state={state} account={account}></Investors>
    <Toaster richColors position="top-center"  />
    </div>
  );
}
export default App;