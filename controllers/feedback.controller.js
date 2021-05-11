const {Feedback} = require("../models");
// Store the feedback
const saveFeedback = async(req, res)=>{
        console.log("saving the Feedback..");
        const {name, email, comment} = req.body;
        let status;
        let message;
        try{
            const feedback = Feedback({
                name:name,
                email:email,
                comment:comment
            });
            await feedback.save();
            status = 200;
            message="Feedback is saved successfully";
        }catch(err){
            return res.status(400).send({message:"something is went wrong"},err);
        }
        res.status(status).send({message});
}
module.exports ={
    saveFeedback
}