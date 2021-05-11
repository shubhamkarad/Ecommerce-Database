const {Contact} = require('../models');
// Store the response
const saveResponse= async(req, res)=>{
    console.log("saving the response..");
    const {name, email, phoneNo, query} = req.body;

    let status;
    let message;

    try{
        const contact = Contact({
            name:name,
            email:email,
            phoneNo:phoneNo,
            query:query
        });
        await contact.save();
        status= 200;
        message="your query is created successfully";
    }catch(err){
        res.status(400).send({message:"something is went wrong"});
    }
    res.status(status).send({message});
}
module.exports={
    saveResponse
}