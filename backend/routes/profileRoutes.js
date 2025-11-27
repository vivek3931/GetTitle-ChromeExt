const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

router.post('/profiles', profileController.createOrUpdateProfile);
router.get('/profiles', profileController.getAllProfiles);

module.exports = router;