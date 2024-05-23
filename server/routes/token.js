const express = require('express');
const { createToken, createOrder, acceptOrder, stkPush } = require('../controllers/token');

const router = express.Router();

router.get('/order/:id', (req, res) => {
    const orderId = parseInt(req.params.id);
    const order = orders.find(o => o.id === orderId);

    if (!order) {
        return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json(order);
});

router.post('/order', createOrder);
router.post('/order/:id/accept', createToken, acceptOrder, stkPush);

module.exports = router;
