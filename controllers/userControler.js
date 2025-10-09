const { getCollections } = require("../config/database");

const createUser = async (req, res) => {
    const {userCollection} = getCollections();
    try {
        const userData = req.body;
        const existingUser = await userCollection.findOne({ email: userData.email });
        if (existingUser) {
            return res.status(409).send({ message: 'user already exist' });
        }
        const result = await userCollection.insertOne(userData);
        res.status(201).send(result);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const getUserByEmail = async (req, res) => {
    try {
        const {userCollection} = getCollections();
        const  email  = req.query.email;
        if (!email) {
            return res.status(400).send({ message: 'Email query is required' });
        }

        const result = await userCollection.findOne({ email: email });

        if (!result) {
            return res.status(404).send({ message: 'Email not found' });
        }

        res.status(200).send(result);
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }
};

module.exports = { createUser, getUserByEmail };
