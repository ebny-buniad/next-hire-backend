const { ObjectId } = require("mongodb");
const { getCollections } = require("../config/database")

const createCompanyProfile = async (req, res) => {
    try {
        const { companyCollection } = getCollections();
        const companyData = req.body;
        const email = companyData.email;
        const existingCompany = await companyCollection.findOne({ email: email });
        if (existingCompany) {
            return res.status(409).send({ message: 'Company profile already exist' });
        }
        const result = await companyCollection.insertOne(companyData);
        res.status(200).send({
            message: 'company profile create successful',
            data: result
        })
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }
}

// Get company profile 
const getCompanyProfile = async (req, res) => {
    try {
        const { companyCollection } = getCollections();
        const { email, field, companyName } = req.query;

        // Company info load by name
        if (companyName) {
            const decodedName = decodeURIComponent(companyName);
            const query = {
                companyName: { $regex: new RegExp(`^${decodedName}$`, "i") },
            };
            const result = await companyCollection.findOne(query);
            res.status(200).send({
                message: 'company profile get successful by company name',
                data: result
            });
        }

        // Company info load by email
        else if (email && !field) {
            const result = await companyCollection.findOne({ email });
            return res.status(200).send({
                message: "Company profile fetched successfully (full)",
                data: result,
            });
        }

        // Company specific data load (logo, name ...)
        else if (email && field) {
            const fieldsArray = field.split(",").map((f) => f.trim());
            const projection = {};
            fieldsArray.forEach((f) => (projection[f] = 1));
            projection._id = 0;

            const result = await companyCollection.findOne(
                { email },
                { projection }
            );

            res.status(200).send({
                message: "Company profile fetched successfully (selected fields)",
                data: result,
            });
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// Delete company profile
const deleteCompanyProfile = async (req, res) => {
    try {
        const { companyCollection } = getCollections();
        const email = req.query.email;
        const query = { email: email }
        const result = await companyCollection.deleteOne(query);
        res.status(200).send({
            message: 'company profile deleted successful',
            data: result
        });
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }
}


// Update company profile
const updateCompanyProfile = async (req, res) => {
    try {
        const { companyCollection } = getCollections();
        const updateData = req.body;
        const email = req.query.email;
        const query = { email: email };
        const options = { upsert: true };
        const updateDoc = {
            $set: updateData
        }
        const result = await companyCollection.updateOne(query, updateDoc, options);
        res.status(200).send({
            message: 'company profile deleted successful',
            data: result
        });
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }
}

module.exports = {
    createCompanyProfile, getCompanyProfile, deleteCompanyProfile,
    updateCompanyProfile
}