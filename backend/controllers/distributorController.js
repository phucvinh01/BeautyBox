const { Distributor } = require("../model/distributorModel");


const brandController = {
    //create
    create: async (req, res) => {
        const distributor = new Distributor(req.body)
        try {
            const saved = await distributor.save();
            res.status(200).json({
                status: true,
                data: saved
            });
        } catch (err) {
            res.status(200).json({
                status: false,
                data: err,
            });
        }
    },
    //GET ALL
    getAll: async (req, res) => {
        try {
            const distributor = await Distributor.find();
            res.status(200).json({
                status: true,
                data: distributor
            });
        } catch (err) {
            res.status(500).json({
                status: false,
                data: err
            });
        }
    },
    //get by id
    getById: async (req, res) => {
        try {
            const distributor = await Distributor.findById(req.params.id);
            res.status(200).json(distributor);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //UPDATE
    updateDistributor: async (req, res) => {
        try {
            const distributor = await Distributor.findById(req.params.id);
            await distributor.updateOne({ $set: req.body });
            res.status(200).json("Updated successfully!");
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //DELETE Distributor
    deleteDistributor: async (req, res) => {
        try {
            const r = await Distributor.findById(req.params.id);
            await r.updateOne({ $set: { isActive: !r.isActive } });
            res.status(200).json({
                status: true,
                data: !r.isActive
            });
        } catch (err) {
            res.status(500).json({ "success": false });
        }
    },
};

module.exports = brandController;
