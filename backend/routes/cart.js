const express = require("express");
const router = express.Router();
const CartController = require("../controllers/cart.js");
const { authenticateToken } = require("../middlewares/authMiddleware.js");

router.route("/addToCart").put(authenticateToken, CartController.addtoCart);

router.route("/delCartBook").delete(authenticateToken, CartController.delFromCart);

router.route("/getCartBooks").get(authenticateToken, CartController.getCartBooks);


module.exports = router;