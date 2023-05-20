import User from "../models/User.js";

class indicationController{
    async openLink(req,res){
        
        const code = req.params.code
        const master = await User.findOne({ indication_code: code })
        if(master.open_link && master.open_link != undefined){
            const new_quant = master.open_link+1
            await User.findOneAndUpdate({ indication_code: code }, { open_link: new_quant})
        }else{
            const new_quant = 1
            await User.findOneAndUpdate({ indication_code: code }, { open_link: new_quant})
        }
        return
    }
    async signup(req,res){

    }
    async getAllIndications(req,res){
        
    }
}