const express = require("express");
const router = express.Router();
const FavController = require("../controllers/favourites.js");
const { authenticateToken} = require("../middlewares/authMiddleware.js");

router.route("/add-book-to-fav").put(authenticateToken, FavController.addToFav);

router.route("/delfavBook").delete(authenticateToken, FavController.delFromFav);

router.route("/getFavBooks").get(authenticateToken, FavController.getFavBooks);


module.exports = router;