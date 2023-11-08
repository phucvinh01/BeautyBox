const productController = require("../controllers/productController");
const reviewController = require("../controllers/reviewController")
const multer = require('multer');
const router = require("express").Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Đường dẫn lưu trữ cho file upload
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Tên file sẽ được giữ nguyên
    }
});

const upload = multer({ storage });

//CRETAE
router.post("/", productController.create);

//GET ALL
router.get("/", productController.getAll);

//GET ONE
router.get("/:id", productController.getById);

//GET NEW 

router.get("/offset", productController.getOffsetNew);

//UPDATE 
router.put("/:id", productController.updateProduct);

//DELETE 
router.delete("/:id", productController.deleteProduct);

//SEARCH
router.post("/search/:name", productController.searchByName);

router.put("/updateActive/:id", productController.updateStatus);

router.put("/updateDiscount/:id", productController.updateDiscount);
//Insert many
router.post("/insertMany", upload.single('file'), productController.insertManyFromJSON);

router.get("/product/:slug", productController.searchBySlug);
//GET SALE BY PRODUCT
router.get("/sales/product", productController.statisticSaleByProduct)

router.get("/sales/month", productController.statisticSaleByMonth)

router.get("/sale/get-least-most", productController.getLeastAndMost)

router.get("/sale/count-quantity", productController.sumQuantityProductSale)

router.get("/sale/eachMonth", productController.getSaleEachMonth)

router.get("/sale/dailyMonth", productController.getSalesStatistics)

router.post("/create-review/", reviewController.createReview)

router.get("/review/:id", reviewController.getReviewByProduct)


module.exports = router;