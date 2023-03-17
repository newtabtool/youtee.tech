import TrailModel from "../models/TrailModel.js";


class comunityController{
    async listAll(req, res) {
        let user = req.id;
        let trails = await TrailModel.find({ publik: true })
        ///console.log(trails)
        return res.send({ trails: trails })
    }
}
export default new comunityController()