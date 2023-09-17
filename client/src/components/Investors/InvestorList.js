import {useState,useEffect} from "react"
function InvestorList({state}){
   const [list,setList] = useState([])

   useEffect(()=>{
      async function investorList(){
         const list = await state.contract.methods.InvestorList().call()

         setList(list)
      }
     state.contract && investorList()
   },[state])
 
   return <>
      <table className="list">
         <tbody>
            {list.map((singleAddress,index)=>{
              return( <tr key={index}>
                  {singleAddress}
               </tr>)
            })}
         </tbody>
      </table>
   </>
   
  }
  export default InvestorList;