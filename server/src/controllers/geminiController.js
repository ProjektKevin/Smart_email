const geminiModel = require('../models/geminiModel'); // Adjust the path to the correct model file

module.exports.geminiGenerateEmail = async (req, res) => {
    const { data } = req.body;

    if (!data) {
        return res.status(400).json({ error: "Missing required data" });
    }

    try {
        const content = await geminiModel.requestGemini(data);

        return res.status(200).json({ content });
        
    } catch (error) {
        return res.status(500).json({ error: error.message });

    }
};
