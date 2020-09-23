let router = require('express').Router();
router.get('/', function (req, res) {
    res.json({
        status: "success",
        message: 'The API is working!'
    });
});

// Import contact controller
let contactController = require('../controllers/contact-controller');
// Contact routes
router.route('/contacts')
    .get(contactController.index)
    .post(contactController.new);
router.route('/contacts/:contact_id')
    .get(contactController.view)
    .put(contactController.update)
    .delete(contactController.delete);

module.exports = router;