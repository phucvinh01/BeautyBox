
const { Cart } = require('../model/cartModel')
const { Product } = require('../model/productModel')
const { User } = require('../model/userModel')
const cartController = {
    addToCart: async (req, res) => {
        try {


            const { userId, itemId } = req.body;

            console.log(itemId);
            let data = null;

            const quantity = Number.parseInt(req.body.quantity);

            let cart = await Cart.findOne({ userId: userId });
            const productDetails = await Product.findById(itemId);

            console.log("productDetails", productDetails)

            //-- Check if cart Exists and Check the quantity if items -------
            if (cart) {
                let indexFound = cart.items.findIndex(p => p.itemId == itemId);
                console.log("Index", indexFound)
                //----------check if product exist,just add the previous quantity with the new quantity and update the total price-------
                if (indexFound != -1) {
                    cart.items[indexFound].quantity = cart.items[indexFound].quantity + quantity;
                    cart.items[indexFound].total = cart.items[indexFound].quantity * productDetails.price;
                    cart.items[indexFound].price = productDetails.price
                    cart.items[indexFound].img = productDetails.img
                    cart.items[indexFound].name = productDetails.name
                    cart.subTotal = cart.items.map(item => item.total).reduce((acc, curr) => acc + curr);
                }
                //----Check if Quantity is Greater than 0 then add item to items Array ----
                else if (quantity > 0) {
                    cart.items.push({
                        productId: itemId,
                        quantity: quantity,
                        price: productDetails.price,
                        img: productDetails.img,
                        name: productDetails.name,
                        total: parseInt(productDetails.price * quantity).toFixed(2),
                    })
                    cart.subTotal = cart.items.map(item => item.total).reduce((acc, curr) => acc + curr);
                }
                //----if quantity of price is 0 throw the error -------
                else {
                    return res.status(400).json({
                        code: 400,
                        message: "Invalid request"
                    })
                }

                data = await cart.save();
            }
            //------if there is no user with a cart then it creates a new cart and then adds the item to the cart that has been created---------
            else {
                const cartData = {
                    userId: userId,
                    items: [{
                        productId: itemId,
                        quantity: quantity,
                        total: parseInt(productDetails.price * quantity),
                        img: productDetails.img,
                        price: productDetails.price,
                        name: productDetails.name,

                    }],
                    subTotal: parseInt(productDetails.price * quantity)
                }
                cart = new Cart(cartData);
                data = await cart.save();
            }

            return res.status(200).send({
                code: 200,
                message: "Add to Cart successfully!",
                data: data
            });

        },

        getCart: async (req, res) => {
            try {
                let userId = req.params.id;
                let cart = await Cart.findOne({ userId: userId });
                if (!cart)
                    return res
                        .status(404)
                        .send({ status: false, message: "Cart not found for this user" });

                res.status(200).json({ status: true, cart: cart });
            }
            catch (err) {
                res.status(500).json({ status: false })
            }

        },

            decreaseQuantity: async (req, res) => {
                // use add product endpoint for increase quantity

                try {
                    const { userId, productId } = req.body;
                    console.log(userId);
                    let cart = await Cart.findOne({ userId: userId });
                    console.log(cart);
                    if (!cart)
                        return res
                            .status(404)
                            .json({ status: false, message: "Cart not found for this user" });

                    let itemIndex = cart.items.findIndex((p) => p.productId == productId);

                    if (itemIndex === 0) {
                        cart.items = [];
                        cart.subTotal = 0;
                        cart = await cart.save();
                        return res.status(200).json({
                            code: 200,
                            message: "Delete successfully!",
                            data: cart
                        })
                    }

                    if (itemIndex > -1) {
                        let productItem = cart.items[itemIndex];
                        if (productItem.quantity === 1) {
                            let cartTemp = cart.items.splice(itemIndex, 1);
                            cart.subTotal = cart.subTotal - cart.items[itemIndex].price
                            cart = await cart.save();
                            return res.status(200).json({
                                code: 200,
                                message: "Delete successfully!",
                                data: cart
                            });
                        }
                        else {
                            productItem.quantity -= 1;
                            cart.items[itemIndex] = productItem;
                            cart.subTotal = cart.subTotal - cart.items[itemIndex].price
                            cart = await cart.save();
                            return res.status(200).send({
                                code: 200,
                                message: "Decrease successfully!",
                                data: cart
                            });
                        }
                    }
                } catch (err) {
                    res
                        .status(400)
                        .send({ status: false, message: "Item does not exist in cart" });
                }
            },

                removeItem: async (req, res) => {

                    try {
                        let userId = req.params.userId;
                        let productId = req.body.productId;
                        let cart = await Cart.findOne({ userId: userId });
                        if (!cart)
                            return res
                                .status(404)
                                .json({ status: false, message: "Cart not found for this user" });

                        let itemIndex = cart.items.findIndex((p) => p.productId == productId);

                        if (itemIndex === 0) {
                            cart.items = [];
                            cart.subTotal = 0;
                            cart = await cart.save();
                            return res.status(200).json({
                                code: 200,
                                message: "Delete successfully!",
                                data: cart
                            })
                        }
                        else if (itemIndex > -1) {
                            cart.items.splice(itemIndex, 1);
                            cart.subTotal = cart.subTotal - cart.items[itemIndex].price
                            cart = await cart.save();
                            return res.status(200).json({
                                code: 200,
                                message: "Delete successfully!",
                                data: cart
                            });
                        }
                    }
                    catch (err) {
                        res
                            .status(400)
                            .json({ status: false, message: "Item does not exist in cart" });
                    }


                }

    }


module.exports = cartController;