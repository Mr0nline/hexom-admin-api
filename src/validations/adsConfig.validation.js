const Joi = require('joi');
const { objectId } = require('./custom.validation');
const { AD_CONFIG_FLAG } = require('../constants');

const adsConfigCommonSchema = {
  success: Joi.boolean(),
  flag: Joi.string().valid(AD_CONFIG_FLAG.FORCE, AD_CONFIG_FLAG.MOVE, AD_CONFIG_FLAG.SKIP, AD_CONFIG_FLAG.NORMAL),
  version: Joi.number().precision(2),
  title: Joi.string(),
  description: Joi.string(),
  link: Joi.string(),
  buttonName: Joi.string(),
  buttonSkip: Joi.string(),
  AllAdsOn: Joi.boolean(),
  gAdOn: Joi.boolean(),
  gInterOn: Joi.boolean(),
  gMinNativeOn: Joi.boolean(),
  gLargeNativeOn: Joi.boolean(),
  gAppOpenOn: Joi.boolean(),
  gBackInterOn: Joi.boolean(),
  gExitInterOn: Joi.boolean(),
  gSplashOpenAdOn: Joi.boolean(),
  gIntervalCount: Joi.number().integer(),
  gBackIntervalCount: Joi.number().integer(),
  gInterId: Joi.string(),
  gNativeId: Joi.string(),
  gAppOpenId: Joi.string(),
  qAdOn: Joi.boolean(),
  qLinkId: Joi.string(),
  qPrivacyPolicy: Joi.string(),
  qOpenAdOn: Joi.boolean(),
  qInterOn: Joi.boolean(),
  qMinNativeOn: Joi.boolean(),
  qLargeNativeOn: Joi.boolean(),
  qBackInterOn: Joi.boolean(),
  uAdOn: Joi.boolean(),
  uInterOn: Joi.boolean(),
  uBannerOn: Joi.boolean(),
  uInterId: Joi.string(),
  uBannerId: Joi.string(),
  uGameId: Joi.string(),
};

const createAdsConfig = {
  body: Joi.object().keys({
    ...adsConfigCommonSchema,
    packageName: Joi.string().required(),
    title: Joi.string().required(),
  }),
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
