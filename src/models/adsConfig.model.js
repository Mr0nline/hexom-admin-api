const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { AD_CONFIG_FLAG } = require('../constants');

const adsConfigSchema = mongoose.Schema(
  {
    packageName: {
      type: String,
      required: true,
      unique: true,
    },
    success: {
      type: Boolean,
      required: true,
      default: true,
    },
    flag: {
      type: String,
      required: true,
      enum: [AD_CONFIG_FLAG.FORCE, AD_CONFIG_FLAG.SKIP, AD_CONFIG_FLAG.MOVE, AD_CONFIG_FLAG.NORMAL],
      default: AD_CONFIG_FLAG.NORMAL,
    },
    version: {
      type: Number,
      default: 1,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    link: {
      type: String,
      default: '',
    },
    buttonName: {
      type: String,
      default: '',
    },
    buttonSkip: {
      type: String,
      default: '',
    },
    AllAdsOn: {
      type: Boolean,
      default: true,
    },
    // Google Admob Config
    gAdOn: {
      type: Boolean,
      default: false,
    },
    gInterOn: {
      type: Boolean,
      default: false,
    },
    gMinNativeOn: {
      type: Boolean,
      default: false,
    },
    gLargeNativeOn: {
      type: Boolean,
      default: false,
    },
    gAppOpenOn: {
      type: Boolean,
      default: false,
    },
    gBackInterOn: {
      type: Boolean,
      default: false,
    },
    gExitInterOn: {
      type: Boolean,
      default: false,
    },
    gSplashOpenAdOn: {
      type: Boolean,
      default: false,
    },
    gIntervalCount: {
      type: Number,
      default: 3,
    },
    gBackIntervalCount: {
      type: Number,
      default: 2,
    },
    gInterId: {
      type: String,
      default: '',
    },
    gNativeId: {
      type: String,
      default: '',
    },
    gAppOpenId: {
      type: String,
      default: '',
    },
    // Qureka Config
    qAdOn: {
      type: Boolean,
      default: false,
    },
    qLinkId: {
      type: String,
      default: '',
    },
    qPrivacyPolicy: {
      type: String,
      default: '',
    },
    qOpenAdOn: {
      type: Boolean,
      default: true,
    },
    qInterOn: {
      type: Boolean,
      default: true,
    },
    qMinNativeOn: {
      type: Boolean,
      default: true,
    },
    qLargeNativeOn: {
      type: Boolean,
      default: true,
    },
    qBackInterOn: {
      type: Boolean,
      default: true,
    },
    // Unity config
    uAdOn: {
      type: Boolean,
      default: true,
    },
    uInterOn: {
      type: Boolean,
      default: true,
    },
    uBannerOn: {
      type: Boolean,
      default: true,
    },
    uInterId: {
      type: String,
      default: '',
    },
    uBannerId: {
      type: String,
      default: '',
    },
    uGameId: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
adsConfigSchema.plugin(toJSON);
adsConfigSchema.plugin(paginate);

/**
 * @typedef Token
 */
const AdsConfig = mongoose.model('AdsConfig', adsConfigSchema);

module.exports = AdsConfig;
