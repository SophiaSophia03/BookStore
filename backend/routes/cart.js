const express = require("express");
const router = express.Router();
const CartController = require("../controllers/cart.js");
const { authenticateToken } = require("../middlewares/authMiddleware.js");

router.route("/add-to-cart").put(authenticateToken, CartController.addtoCart);

router.route("/delCartBook/:bookid").delete(authenticateToken, CartController.delFromCart);

router.route("/getCartBooks").get(authenticateToken, CartController.getCartBooks);


module.exports = router;