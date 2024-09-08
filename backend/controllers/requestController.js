const { validationResult } = require('express-validator');
const Request = require('../models/Request');

const register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        const { cms_id } = req.body;
        const request = await Request.findOne({ cms_id });
        if (request) {
            return res.status(400).json({
                success: false,
                errors: [{ msg: 'Request already exists' }]
            });
        } else {
            const newRequest = await Request.create({
                cms_id: cms_id
            });

            console.log('newRequest: ' + newRequest)
            return res.status(200).json({
                success: true,
                newRequest
            });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, errors: [{ msg: err.message }] });
    }
}

const getAll = async (req, res) => {
    try {
        const requests = await Request.find();
        console.error('requests: ' + requests);
        return res.status(200).json(requests);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error');
    }
}


const deleteReq = async (req, res) => {
    const cms_id = req.body.cms_id;
    console.log("cms_id for delete: " + cms_id);

    try {
        const request = await Request.findOneAndDelete({ cms_id });

        if (!request) {
            return res.status(404).json({
                success: false,
                message: 'Request not found'
            });
        } else {
            const requests = await Request.find();
            console.log('delete result: ' + JSON.stringify(requests));
            return res.status(200).json(requests);
        }
    } catch (error) {
        console.error('Error deleting request:', error.message);
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};



module.exports = {
    register,
    getAll,
    deleteReq
}