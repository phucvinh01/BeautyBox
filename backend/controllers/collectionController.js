const { Collection } = require("../model/collectionModel");


const collectionController = {
    //create
    create: async (req, res) => {
        const newCollection = new Collection(req.body)
        try {
            const savedCollection = await newCollection.save();
            res.status(200).json(savedCollection);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //GET ALL
    getAll: async (req, res) => {
        try {
            const collection = await Collection.find();
            res.status(200).json({
                status: true,
                data: collection
            });
        } catch (err) {
            res.status(200).json({
                status: false,
                data: err
            });
        }
    },
};

module.exports = collectionController;
