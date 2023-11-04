import "./investors.css"
import { toast } from "sonner"

function VoteProposal({state,account}){
  async function vote(event){
    event.preventDefault()
    const voteId = document.querySelector("#voteId").value
    try{
      await state.contract.methods.voteProposal(voteId).send({from:account,gas:"1000000"})
      toast.success("You have voted succesfully")
      window.location.reload();
    }
    catch(error){
      toast.error(error.message)
    }
  }
    return<><form onSubmit={vote} >
     <label className="label1" htmlFor="voteId">
     <span className="font">Proposal Id:</span>
        </label>
    <input type="text" id="voteId"></input>
    <button className ="button" type="submit">Vote</button>
    </form><br></br></>
   }
   export default VoteProposal;