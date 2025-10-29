const { getCollections } = require("../config/database")

const createJob = async (req, res) => {
    try {
        const { jobCollection } = getCollections();
        const jobDetails = req.body;
        const result = await jobCollection.insertOne(jobDetails);
        res.status(200).send({
            message: 'Job post successful',
            data: result
        });
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const getAllJobs = async (req, res) => {
    try {
        const { jobCollection } = getCollections();
        const status = req.query.status || "active";
        const jobsWithCompany = await jobCollection.aggregate([
            {
                $match: { status }
            },
            {
                $lookup: {
                    from: "company-profiles",
                    localField: "posted_by",
                    foreignField: "email",
                    as: "companyInfo",
                    pipeline: [
                        {
                            $project: { companyName: 1, logo: 1, website: 1, _id: 0 }
                        }
                    ]
                }
            },
            {
                $unwind: "$companyInfo"
            }
        ]).toArray();

        res.status(200).send({
            message: "All jobs with company info fetched successfully",
            data: jobsWithCompany
        });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};


module.exports = { createJob, getAllJobs }