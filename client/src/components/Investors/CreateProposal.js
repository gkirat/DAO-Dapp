// import "./manager.css"
import {toast} from "sonner"
// import { useState,useEffect } from 'react'
function CreateProposal({state,account}){

        async function createProposal(event){
            event.preventDefault()
            const description = document.querySelector("#description").value
            const amount = document.querySelector("#amount").value
            const recipient = document.querySelector("#recipient").value
            try{
                await state.contract.methods.createProposal(description,amount,recipient).send({from:account,gas:"1000000"})
                toast.success("Proposal created succesfully")
                window.location.reload();
            }
            catch(error){
                // console.table(error.message)
                toast.error(error.message)
            }
        }
  
   
    return<><form onSubmit={createProposal}>
    <label className="label1" htmlFor="name">
    <span className="font">Description:</span>
    </label>
    <input type="text" id="description"></input>
    <label className="label1" htmlFor="amount">
    <span className="font"> Amount Neeed(in Wei):</span>
        </label>
    <input type="text" id="amount"></input>
    <label className="label1" htmlFor="recipient">
    <span className="font">Recipient Address:</span>
        </label>
    <input type="text" id="recipient"></input>
    <button className="button" type="submit">Create Proposal</button>
    </form><br></br></>
    
   }
   export default CreateProposal;