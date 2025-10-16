const { getCollections } = require("../config/database");

// Create user when reg.

const createUser = async (req, res) => {
    const { userCollection, subscriptionCollection } = getCollections();
    try {
        const userData = req.body;
        const existingUser = await userCollection.findOne({ email: userData.email });
        if (existingUser) {
            return res.status(409).send({ message: 'user already exist' });
        }
        const userResult = await userCollection.insertOne(userData);

        // create default subscription for new user
        const subscriptionDoc = {
            email: userData.email,
            plan: 'free',
            price: 0,
            appliedCount: 0,
            applyLimit: 5,
            startDate: new Date(),
            expireDate: new Date(new Date().setDate(new Date().getDate() + 30)),
            status: 'active'
        }
        const subscriptionResult = await subscriptionCollection.insertOne(subscriptionDoc);
        res.status(201).send({
            message: 'User created successfully with default free plan',
            user: userResult,
            subscription: subscriptionResult
        });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const getUserByEmail = async (req, res) => {
    try {
        const { userCollection } = getCollections();
        const email = req.query.email;
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

const updateProfilePic = async (req, res) => {
    try {
        const { userCollection } = getCollections();
        const email = req.query.email;
        const { photoURL } = req.body;
        console.log(photoURL);
        const query = { email: email };
        const updateDoc = {
            $set: { photoURL }
        }
        const result = await userCollection.updateOne(query, updateDoc, { upsert: true });
        res.status(200).send({ message: 'profile update successfully', data: result });
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }
}

// Delete user and user profile

const deleteUserProfile = async (req, res) => {
    try {
        const { userCollection, profileCollection } = getCollections();
        const email = req.query.email;
        const query = { email: email }
        const userDelete = await userCollection.deleteOne(query);
        const profileDelete = await profileCollection.deleteOne(query);
        const result = { userDelete, profileDelete };
        res.status(200).send({ message: 'User and profile delete successfull', data: result })
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }
}

module.exports = { createUser, getUserByEmail, updateProfilePic, deleteUserProfile };
