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

// Get company profile by email
const getCompanyProfile = async (req, res) => {
    try {
        const { companyCollection } = getCollections();
        const email = req.query.email;
        const result = await companyCollection.findOne({email: email});
        res.status(200).send({
            message: 'company profile get successful',
            data: result
        })

    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }

}

module.exports = { createCompanyProfile, getCompanyProfile }