const { ObjectId } = require("mongodb");
const { getCollections } = require("../config/database")

const createPlan = async (req, res) => {
    try {
        const { planCollection } = getCollections();
        const data = req.body;
        const result = await planCollection.insertOne(data);
        res.status(200).send({
            message: 'Plan Create successfull!',
            data: result
        })
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const getPlan = async (req, res) => {
    try {
        const { planCollection } = getCollections();
        const { role } = req.params;
        const query = { role };
        const result = await planCollection.find(query).toArray();
        res.status(200).send({
            message: 'Plans get successfull!',
            data: result
        })
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }
}

// Delete Plan

const deletePlan = async (req, res) => {
    try {
        const { planCollection } = getCollections();
        const id = req.params.id;
        const query = { _id: new ObjectId(id) }
        const result = await planCollection.deleteOne(query);
        res.status(200).send({
            message: 'Plans get successfull!',
            data: result
        })
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }
}

module.exports = { createPlan, getPlan, deletePlan }