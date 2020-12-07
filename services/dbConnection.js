const mongoose = require("mongoose");

const connectToDatabase = () => {

    const uri = "mongodb://root:coca@cluster0-shard-00-00.6tzvc.mongodb.net:27017,cluster0-shard-00-01.6tzvc.mongodb.net:27017,cluster0-shard-00-02.6tzvc.mongodb.net:27017/shoeShop?ssl=true&replicaSet=atlas-1t3s95-shard-0&authSource=admin&retryWrites=true&w=majority"
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log("Connected to database"))
        .catch(error => console.log(error));
};
module.exports = {
    connect: connectToDatabase
};