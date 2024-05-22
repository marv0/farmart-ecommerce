const express = require('express');
const { createToken, createOrder, acceptOrder, stkPush } = require('../controllers/token');

const router = express.Router();

router.post('/order', createOrder);
router.post('/order/:id/accept', createToken, acceptOrder, stkPush);

module.exports = router;
