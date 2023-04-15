const checkout = document.querySelector("#checkout")
const check = document.querySelector("#check")
const box = document.querySelector("#box")

checkout.onclick = (e)=>{
    if(check.checked)
    {
        
    }else{
        e.preventDefault();
        box.classList.add("danger");
        setTimeout(()=>{box.classList.remove("danger")}, 1100)
    }
}