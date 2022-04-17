const Joi = require('joi');
const { objectId } = require('./custom.validation');
const { AD_CONFIG_FLAG } = require('../constants');

const adsConfigCommonSchema = {
  success: Joi.boolean(),
  flag: Joi.string().valid(AD_CONFIG_FLAG.FORCE, AD_CONFIG_FLAG.MOVE, AD_CONFIG_FLAG.SKIP, AD_CONFIG_FLAG.NORMAL),
  version: Joi.number().precision(2),
  title: Joi.string().required(),
  description: Joi.string(),
  link: Joi.string(),
  buttonName: Joi.string(),
  buttonSkip: Joi.string(),
  AdsOnOff: Joi.boolean(),
  FullScreenOnOff: Joi.boolean(),
  GoogleInterAds: Joi.string(),
  GoogleNativeAds: Joi.string(),
  GoogleAppOpenAds: Joi.string(),
  GoogleMiniNativeOnOff: Joi.boolean(),
  GoogleLargeNativeOnOff: Joi.boolean(),
  GoogleIntervalCount: Joi.number().integer(),
  GoogleBackInterOnOff: Joi.boolean(),
  GoogleBackInterIntervalCount: Joi.number().integer(),
  GoogleExitSplashInterOnOff: Joi.boolean(),
  GoogleSplashOpenAdsOnOff: Joi.boolean(),
  GoogleNativeTextOnOff: Joi.boolean(),
  GoogleNativeText: Joi.string(),
  QurekaLink: Joi.string(),
  QurekaOnOff: Joi.boolean(),
  QurekaAppOpenOnOff: Joi.boolean(),
  QurekaInterOnOff: Joi.boolean(),
  QurekaMiniNativeOnOff: Joi.boolean(),
  QurekaLargeNativeOnOff: Joi.boolean(),
  QurekaInterCloseOnOff: Joi.boolean(),
  QurekaBackInterOnOff: Joi.boolean(),
  UnityOnOff: Joi.boolean(),
  UnityFullScreenIdOnOff: Joi.boolean(),
  UnityInterId: Joi.string(),
  UnityNative: Joi.string(),
  HomeNativeBackgroundColorOnOff: Joi.boolean(),
  NativeBackgroundColor: Joi.string(),
  AllPagesNativeBackgroundOnOff: Joi.boolean(),
  AllPagesNativeBackgroundCount: Joi.number().integer(),
  PolicyLink: Joi.string(),
};

const createAdsConfig = {
  body: Joi.object().keys({ ...adsConfigCommonSchema, packageName: Joi.string().required() }),
};

const getAdsConfigs = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getAdsConfig = {
  params: Joi.object().keys({
    adsConfigId: Joi.string().custom(objectId),
  }),
};

const getAdsConfigFromPackageName = {
  query: Joi.object().keys({
    packageName: Joi.string().required(),
  }),
};

const updateAdsConfig = {
  params: Joi.object().keys({
    adsConfigId: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys(adsConfigCommonSchema).min(1),
};

const deleteAdsConfig = {
  params: Joi.object().keys({
    adsConfigId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createAdsConfig,
  getAdsConfigs,
  getAdsConfig,
  getAdsConfigFromPackageName,
  updateAdsConfig,
  deleteAdsConfig,
};
