const express=require("express")
const {reportsModel}=require("../model/report.model");


const reportRouter= express.Router();

reportRouter.post("/add", async (req, res) => {
    const payload = req.body;

    try {
        const report = new reportsModel(payload);
        await report.save();
        res.status(200).send({ "msg": "report document  has been added successfully!!" })
    } catch (error) {
        res.status(400).json({ error: error });
    }

})

reportRouter.get("/",async (req,res)=>{
    try {
        const searchQuery = req.query
        let report;

        if(searchQuery){
             report = await reportsModel.find(searchQuery);
        }else{
             report=await reportsModel.find({})
        }
        
        res.status(200).json(report)
    } catch (error) {
        res.status(400).json({"err":error})
    }
})

reportRouter.patch("/update/:id", async (req, res) => {
    const { id } = req.params;
    const payload = req.body;


    try {
        const report = await reportsModel.findOne({ "_id": id });
        
        if (report) {
            await reportsModel.findByIdAndUpdate({ "_id": id }, payload);
            res.status(200).send({ "msg": "report document has been updated successfully!!" })
        }else{
            res.status(200).json({"msg":"report document is not available in Database"})
        }
    } catch (error) {
        res.status(400).send({ "err": error });
    }
})

reportRouter.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const report = await reportsModel.findOne({ "_id": id });
        if (report) {
            await reportsModel.findByIdAndDelete({ "_id": id });
            res.status(200).send({ "msg": "report document has been deleted successfully!!" })
        }
    } catch (error) {
        res.status(400).send({ "err": error });
    }
})

module.exports = { reportRouter };