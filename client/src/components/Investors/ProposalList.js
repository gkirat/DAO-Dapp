import { useState,useEffect } from "react";

function ProposalList({state}){
   const [proposal,setProposals] = useState([])

   useEffect(()=>{
      async function list(){
         const proposal = await state.contract.methods.ProposalList().call();
         setProposals(proposal)
        }
       state.contract && list()
   },[state])
   // console.table(proposal)
   return<>
   <table className="list">
      <tbody>
         {proposal.map((prop,index)=>{
            // return (prop.causeDescription)
            const date = new Date(prop.endTime*1000).toGMTString()
            // console.log(date)
              return ( 
               <> 
               <tr > Cause ID
               <td >{prop.causeId}</td>
               </tr>
               <tr >Description
               <td >{prop.causeDescription}</td>
               </tr>
               <tr >Amount Needed
               <td >{prop.amount}</td>
               </tr>
               <tr>Votes
               <td >{prop.votes}</td>
               </tr>
               <tr>Date
               <td >{date}</td>
               </tr>
               <tr>Executed
               <td >{String(prop.isExecuted)}</td>
               </tr>
               
               </>
                )
         })} 
      </tbody>
   </table>
   
   </>
  }
  export default ProposalList;

//   <>
               // <tr> Cause ID
               // <td >{prop.causeId}</td>
               // </tr>
               // <tr >Description
               // <td >{prop.causeDescription}</td>
               // </tr>
               // <tr >Amount Needed
               // <td >{prop.amount}</td>
               // </tr>
               // <tr>Votes
               // <td >{prop.votes}</td>
               // </tr>
               // <tr>Date
               // <td >{date}</td>
               // </tr>
//                </>