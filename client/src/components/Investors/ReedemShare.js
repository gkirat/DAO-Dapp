import "./investors.css"
function ReedemShare({state,account}){
    async function redeemShare(event){
        event.preventDefault()
        const shares = document.querySelector("#shares").value
        // console.log(shares)
        try{
            await state.contract.methods.redeemShare(shares).send({from:account,gas:"1000000"})
            alert("Shares redeemed succesfully");
            window.location.reload( )
        }catch(error){
            alert(error)
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