const { getCollections } = require("../config/database")

const createProfile = async (req, res) => {
    const { profileCollection } = getCollections();
    try {
        const profileInfo = req.body;
        // Check duplicate profile
        const existingProfile = await profileCollection.findOne({ email: profileInfo.email });
        if (existingProfile) {
            return res.status(409).send({ message: 'profile already exist', });
        }
        const result = await profileCollection.insertOne(profileInfo);
        res.status(200).send({ success: true, result });
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const getProfile = async (req, res) => {
    const { profileCollection } = getCollections();
    try {
        const email = req.query.email;
        if (!email) {
            return res.status(400).send({ message: 'Email query is required' });
        }
        const result = await profileCollection.findOne({ email: email });
        res.status(200).send({ message: 'profile get successfully', data: result });
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const updateProfile = async (req, res) => {
    const { profileCollection } = getCollections();
    try {
        const email = req.query.email;
        const updateData = req.body;
        const query = { email: email };
        const updateDoc = {
            $set: updateData
        }
        const result = await profileCollection.updateOne(query, updateDoc, { upsert: true });
        res.status(200).send({ message: 'profile update successfully', data: result });
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }
}



module.exports = { createProfile, getProfile, updateProfile }