const Fine = require("../../model/fineParametersModal");

const getFine = async (req, res) =>  {
    try {
        const fine = await Fine.find();
        console.log(fine[fine.length - 1])
        if (!fine) return res.status(404).json({msg: "No Fines Found"});
        res.status(200).json({fine: fine[fine.length-1]});
    } catch (error) {
        res.status(500).json({msg: error.message});        
    }
}
module.exports = getFine;