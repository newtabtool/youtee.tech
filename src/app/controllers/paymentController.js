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
                        price: process.env.product,
                        quantity: 1,
                    },
                ],
                mode: 'subscription',
                success_url: `${process.env.url}/payment/success/${req.id}`,
                cancel_url: `${process.env.url}/payment/cancel/${req.id}`,
            });
    
            res.redirect(303, session.url);
        } catch (error) {
            sendErrorNotification(error.toString()+"\n \n \n paymentController linha 29");
        }
    }


    async success(req,res){ //pagamento realizado ---------------------------
        const user = req.params.id;
        if(user === req.id){
        try {
            const update_user = await UserModel.findOneAndUpdate({ _id:user}, { premium: true, premium_since: Date.now() });
            res.render('checkout/thanks')
        } catch (error) {
            sendErrorNotification(error.toString()+"\n \n \n paymentController linha 40");
            res.send({ erro: "Desculpe, houve um erro ao atualizar sua inscrição, mas não se preocupe, seu pagamento foi processado e nossa equipe técnica pode te ajudar"})
        }
    }

    }


    async cancel(req,res){
        res.send({Atenção: "Seu pagamento não foi realizado, mas não se preocupe, o fato de você ter tentado ja é um indicativo de que nossa plataforma esa cumprindo com o seu papel"})
    }

    
}
export default new PaymentController()