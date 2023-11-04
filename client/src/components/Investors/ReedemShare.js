import "./investors.css"
import { toast } from "sonner"

function ReedemShare({state,account}){
    async function redeemShare(event){
        event.preventDefault()
        const shares = document.querySelector("#shares").value
        // console.log(shares)
        try{
            await state.contract.methods.redeemShare(shares).send({from:account,gas:"1000000"})
            toast.success("Shares redeemed succesfully");
            window.location.reload( )
        }catch(error){
            toast.error(error.message)
        }
    }
    return<><form onSubmit={redeemShare}>
         <label className="label1" htmlFor="shares">
         <span className="font">Number of Shares:</span>
        </label>
    <input type="text" id="shares"></input>

    <button className="button" type="submit">Reedem Share</button>
    </form><br></br></>
}
export default ReedemShare;