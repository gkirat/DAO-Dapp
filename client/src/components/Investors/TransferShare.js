import "./investors.css"
import { toast } from "sonner"
function TransferShare({state,account}){

    async function transferShare(event){
        event.preventDefault()
        const amount = document.querySelector("#amoun").value
        const to = document.querySelector("#to").value
        
        try{
            await state.contract.methods.transfershares(amount,to).send({from:account,gas:"1000000"})
            toast.success("Shares transferred succesfully");
            window.location.reload( )
        }catch(error){
            toast.error(error.message)
        }
    }
    return<><form onSubmit={transferShare} >
    <label className="label1" htmlFor="amoun">
    <span className="font">Amount:</span>
        </label>
    <input type="text" id="amoun"></input>
    <label className="label1" htmlFor="to">
    <span className="font">Address:</span>
        </label>
    <input type="text" id="to"></input>
    
    <button className="button" type="submit">Transfer Share</button>
    </form><br></br></>
   }
   export default TransferShare;