import "./investors.css"
function Contribute({state,account}){

  async function contribution(event){
    event.preventDefault();
    const weiValue = document.querySelector("#weiValue").value;
    try{
      await state.contract.methods.contribuition().send({from:account,value:weiValue,gas:"1000000"})
      alert("Contribution succesful")
      window.location.reload()
    }catch(error){
      console.log(error)
      alert(error)
    }
   
  }

 return<>
 <form onSubmit={contribution} >
   <label className="label1" htmlFor="weiValue">
   <span className="font">Contribution Amount: </span>
        </label>
    <input type="text" id="weiValue" ></input>
    <button type="submit" className="button">Contribute</button>
    </form>
    <br></br></>
}
export default Contribute;