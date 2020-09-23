let router = require('express').Router();
// Import contact controller
let contactController = require('../controllers/contact-controller');

router.get('/', (req, res) => res.json({
    status: "success",
    message: 'The API is working!'
}));

// Contact routes
router.route('/contacts')
    .get(contactController.index)
    .post(contactController.new);
router.route('/contacts/:contact_id')
    .get(contactController.view)
    .put(contactController.update)
    .delete(contactController.delete);

module.exports = router;