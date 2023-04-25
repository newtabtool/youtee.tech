import path, { dirname } from 'path'
import MarketingModel from '../models/MarketingModel.js';



class MarketingController{
    async emailGetImage(req,res){
        const campaign = req.params.campaign
        const DBValue = await MarketingModel.findOne({ _id: campaign })
        console.log(DBValue)
        const reads = DBValue.read + 1
        const update = await MarketingModel.findOneAndUpdate({ _id: campaign}, { read: reads })
        const pathToImage = path.join(process.cwd(), 'public/assets/faviconpng.png');
        console.log(campaign)
        res.sendFile(pathToImage);
    }
}

export default new MarketingController()