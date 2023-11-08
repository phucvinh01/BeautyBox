const { Review } = require('../model/reviewModel')
const { Product } = require('../model/productModel')

const reviewController = {
    createReview: async (req, res) => {
        const newReview = new Review({ ...req.body });

        try {
            const savedReview = await newReview.save();
            res
                .status(200)
                .json({ success: true, message: "Review submitted", data: savedReview });
        } catch (error) {
            res.status(500).json({ success: false, message: "Failed to submit" });
        }
    },

    getReviewByProduct: async (req, res) => {
        const productId = req.params.id;
        try {
            const reviews = await Review.find({ productId: productId })
            res
                .status(200)
                .json({ success: true, data: reviews });
        }
        catch (error) {
            console.log("Error in getting reviews by product id");
        }
    }
}

module.exports = reviewController;



