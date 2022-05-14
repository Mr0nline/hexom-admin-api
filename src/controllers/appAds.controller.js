const catchAsync = require('../utils/catchAsync');

const { APP_ADS_TEXT } = process.env;

const getAppAdsContent = catchAsync(async (req, res) => {
  res.set('content-type', 'text/plain');
  res.send(APP_ADS_TEXT);
});

module.exports = {
  getAppAdsContent,
};
