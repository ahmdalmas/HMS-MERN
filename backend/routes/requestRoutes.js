const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { register, getAll, deleteReq } = require('../controllers/requestController');

// @route   POST api/request/register
// @desc    Register request
// @access  Public
router.post('/register', [
    check('cms_id', 'CMS ID is required').not().isEmpty()
], register);

// @route   GET api/request/getall
// @desc    Get all requests
// @access  Public
router.get('/getall', getAll);

// @route   DELETE api/request/
// @desc    Delete requests by cms_id
// @access  Public
router.delete('/', deleteReq);

module.exports = router;