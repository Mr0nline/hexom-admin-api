const httpStatus = require('http-status');
const { AdsConfig } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create an adsConfig
 * @param {Object} adsConfigBody
 * @returns {Promise<AdsConfig>}
 */
const createAdsConfig = async (adsConfigBody) => {
  return AdsConfig.create(adsConfigBody);
};

/**
 * Query for adsConfigs
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryAdsConfigs = async (filter, options) => {
  const newVar = await AdsConfig.paginate(filter, options);
  return newVar;
};

/**
 * Get adsConfig by id
 * @param {ObjectId} id
 * @returns {Promise<AdsConfig>}
 */
const getAdsConfigById = async (id) => {
  return AdsConfig.findById(id);
};

/**
 * Get adsConfig by email
 * @param {string} email
 * @returns {Promise<AdsConfig>}
 */
const getAdsConfigByAppPackage = async (packageName) => {
  return AdsConfig.findOne({ packageName });
};

/**
 * Update adsConfig by id
 * @param {ObjectId} adsConfigId
 * @param {Object} updateBody
 * @returns {Promise<AdsConfig>}
 */
const updateAdsConfigById = async (adsConfigId, updateBody) => {
  const adsConfig = await getAdsConfigById(adsConfigId);
  if (!adsConfig) {
    throw new ApiError(httpStatus.NOT_FOUND, 'AdsConfig not found');
  }
  Object.assign(adsConfig, updateBody);
  await adsConfig.save();
  return adsConfig;
};

/**
 * Delete adsConfig by id
 * @param {ObjectId} adsConfigId
 * @returns {Promise<AdsConfig>}
 */
const deleteAdsConfigById = async (adsConfigId) => {
  const adsConfig = await getAdsConfigById(adsConfigId);
  if (!adsConfig) {
    throw new ApiError(httpStatus.NOT_FOUND, 'AdsConfig not found');
  }
  await adsConfig.remove();
  return adsConfig;
};

module.exports = {
  createAdsConfig,
  queryAdsConfigs,
  getAdsConfigById,
  getAdsConfigByAppPackage,
  updateAdsConfigById,
  deleteAdsConfigById,
};
