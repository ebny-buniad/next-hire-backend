const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dpqzrtb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

let database, userCollection, profileCollection;

const connectDB = async () => {
    try {
        await client.connect();

        database = client.db('next-hire');
        userCollection = database.collection('users');
        profileCollection = database.collection('profiles')



        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
    }
}

const getCollections = () => {
    if (!userCollection || !profileCollection) {
        throw new Error('userCollection not initialized. Call connectDB() first')
    }
    return {userCollection, profileCollection};
}


module.exports = { connectDB, getCollections }
