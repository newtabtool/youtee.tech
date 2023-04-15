import str from 'stripe'
import UserModel from '../models/UserModel.js';
import dotenv from 'dotenv'
dotenv.config()
class PaymentController {

    async checkout(req, res) {
        res.render('checkout/checkout')
    }






    async payment(req, res) {
        const stripe = str(process.env.sk_test);
        try {
            const session = await stripe.checkout.sessions.create({
                line_items: [
                    {
                        price: 'price_1MwXOJJGYl8zh8bSJ4OKLdvj',
                        quantity: 1,
                    },
                ],
                mode: 'subscription',
                success_url: `http://localhost:3000/payment/success/${req.id}`,
                cancel_url: `http://localhost:3000/payment/cancel/${req.id}`,
            });
    
            res.redirect(303, session.url);
        } catch (error) {
            console.log(error)
        }
    }

    async success(req,res){
        const user = req.params.id;

        try {
            const update_user = await UserModel.findOneAndUpdate({ _id:user}, { premium: true, premium_since: Date.now() });
            res.render('checkout/thanks')
        } catch (error) {
            console.log(error)
            res.send({ erro: "Desculpe, houve um erro ao atualizar sua inscrição, mas não se preocupe, seu pagamento foi processado e nossa equipe técnica pode te ajudar"})
        }

    }
    async cancel(req,res){
        res.send({MSG: "CANCELADO"})
    }

    
}
export default new PaymentController()