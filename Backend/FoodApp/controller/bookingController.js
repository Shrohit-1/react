let publicKey="pk_test_51LFY3KSHRjPUIMYTtVjMcDUzDzR2eyusqbqlwj081ylIgCRf84x6bQHrhZCuWxzsE6L0xnmMk1XtZhx25JzxG3Bt00pGACfqpC";
let secretKey="sk_test_51LFY3KSHRjPUIMYTxxHNVf7Y2od6qnNjgZR3lMJFAfUmTqVOAcW0BckyflFA0tMikoj2uLyVZqrAvJXvkP3x4kjO00vBp4OBUY";
// This is your test secret API key.
const stripe = require('stripe')(secretKey);
const planModel= require('../models/planModel');
const userModel= require('../models/userModel');

module.exports.createSession= async function createSession(req, res){
    try{
        let userId= req.id;
        let planId=req.params.id;
        const user= userModel.findById(userId);
        const plan=userModel.findById(planId);

        const session = await stripe.checkout.sessions.create({
            payment_method_types:['card'],
            customer_email:user.email,
            client_reference_id: plan.id,
            line_items: [
              {
                // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                name: plan.name,
                currency:"inr",
                price: plan.price,
                quantity: 1,
              },
            ],
            mode: 'payment',
            success_url: `${req.protocol}://${req.get("host")}/success.html`,
            cancel_url: `${req.protocol}://${req.get("host")}/success.html`,
          });
          res.status(200).json({
            "status":"success",
            session
          })
    }
    catch(err){
        res.json({
            message:err.message
        })
    }
    
}
