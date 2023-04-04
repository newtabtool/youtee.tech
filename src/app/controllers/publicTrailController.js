import PublicTrailModel from '../models/PublicTrailModel.js';
import User from '../models/UserModel.js';

class PublicTrail{
    async getAll(req,res){
        const trails = await PublicTrailModel.find()
        const entretenimento= await PublicTrailModel.count({ category: 'entretenimento' });
        const musica= await PublicTrailModel.count({ category: 'musica' });
        const esportes= await PublicTrailModel.count({ category: 'esportes' });
        const jogos= await PublicTrailModel.count({ category: 'jogos' });
        const educacao= await PublicTrailModel.count({ category: 'educacao' });
        const comedia= await PublicTrailModel.count({ category: 'comedia' });
        const noticias= await PublicTrailModel.count({ category: 'noticias' });
        const ciencia= await PublicTrailModel.count({ category: 'ciencia' });
        const moda= await PublicTrailModel.count({ category: 'moda' });
        const viagens= await PublicTrailModel.count({ category: 'viagens' });
        const outros= await PublicTrailModel.count({ category: 'outros' });
        const count = {
            entretenimento, musica, esportes, jogos, educacao, comedia, noticias, ciencia, moda, viagens, outros
        }
        
        //exibir todas as quantidades no console

        res.render('publicTrailsCollection', { trails, count })
    }
    async getForCategory(req,res){}
    async getForTag(){}
}
export default new PublicTrail()