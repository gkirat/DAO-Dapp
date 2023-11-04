import "./manager.css"
import { toast } from "sonner";
function ExecuteProposal({state,account}){
   async function executeProposal(event){
    event.preventDefault();
    const id = document.querySelector("#id").value
    // console.log(id)
    try{
        await state.contract.methods.executeProposal(id).send({from:account,gas:"1000000"})
        toast.success("Proposal executed succesfully")
        window.location.reload(); 
    }catch(error){
        toast.error(error.message)
    }

   }
    return<><form onSubmit={executeProposal}>
    <label className="label1" htmlFor="proposalId">
    <span className="font">Proposal Id:</span>
        </label>
    <input type="text" id="id"></input>
    <button className="button" type="submit">Execute</button>
    </form><br></br></>
    
   }
   export default ExecuteProposal;