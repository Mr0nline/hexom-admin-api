const express = require('express');
const appAdsController = require('../../controllers/appAds.controller');

const router = express.Router();

router.route('/app-ads.txt').get(appAdsController.getAppAdsContent);

module.exports = router;
