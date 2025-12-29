const express = require('express');
const router = express.Router();
const { getAllProducts, getTrendingProducts, getProductById } = require('../controllers/productController');

router.get('/', getAllProducts);
router.get('/trending', getTrendingProducts);
router.get('/:id', getProductById);

module.exports = router;
