const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { adsConfigService } = require('../services');

const createAdsConfig = catchAsync(async (req, res) => {
  const adsConfig = await adsConfigService.createAdsConfig(req.body);
  res.status(httpStatus.CREATED).send(adsConfig);
});

const getAdsConfigs = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await adsConfigService.queryAdsConfigs(filter, options);
  res.send(result);
});

const getAdsConfig = catchAsync(async (req, res) => {
  const adsConfig = await adsConfigService.getAdsConfigById(req.params.adsConfigId);
  if (!adsConfig) {
    throw new ApiError(httpStatus.NOT_FOUND, 'AdsConfig not found');
  }
  res.send(adsConfig);
});

const getAdsConfigFromPackageName = catchAsync(async (req, res) => {
  const adsConfig = await adsConfigService.getAdsConfigByAppPackage(req.query.packageName);
  if (!adsConfig) {
    throw new ApiError(httpStatus.NOT_FOUND, 'AdsConfig not found');
  }
  res.send(adsConfig);
});

const updateAdsConfig = catchAsync(async (req, res) => {
  const adsConfig = await adsConfigService.updateAdsConfigById(req.params.adsConfigId, req.body);
  res.send(adsConfig);
});

const deleteAdsConfig = catchAsync(async (req, res) => {
  await adsConfigService.deleteAdsConfigById(req.params.adsConfigId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createAdsConfig,
  getAdsConfigs,
  getAdsConfig,
  getAdsConfigFromPackageName,
  updateAdsConfig,
  deleteAdsConfig,
};
