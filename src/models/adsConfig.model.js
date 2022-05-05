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
    AdsOnOff: {
      type: Boolean,
      default: true,
    },
    FullScreenOnOff: {
      type: Boolean,
      default: true,
    },
    // Admob config
    GoogleInterAds: {
      type: String,
      default: '',
    },
    GoogleNativeAds: {
      type: String,
      default: '',
    },
    GoogleAppOpenAds: {
      type: String,
      default: '',
    },
    GoogleMiniNativeOnOff: {
      type: Boolean,
      default: true,
    },
    GoogleLargeNativeOnOff: {
      type: Boolean,
      default: true,
    },
    GoogleIntervalCount: {
      type: Number,
      default: 3,
    },
    GoogleBackInterOnOff: {
      type: Boolean,
      default: true,
    },
    GoogleBackInterIntervalCount: {
      type: Number,
      default: 2,
    },
    GoogleExitSplashInterOnOff: {
      type: Boolean,
      default: true,
    },
    GoogleSplashOpenAdsOnOff: {
      type: Boolean,
      default: true,
    },
    GoogleNativeTextOnOff: {
      type: Boolean,
      default: true,
    },
    GoogleNativeText: {
      type: String,
      default: '',
    },
    // Qureka config
    QurekaLink: {
      type: String,
      default: '',
    },
    QurekaOnOff: {
      type: Boolean,
      default: true,
    },
    QurekaAppOpenOnOff: {
      type: Boolean,
      default: true,
    },
    QurekaInterOnOff: {
      type: Boolean,
      default: true,
    },
    QurekaMiniNativeOnOff: {
      type: Boolean,
      default: true,
    },
    QurekaLargeNativeOnOff: {
      type: Boolean,
      default: true,
    },
    QurekaInterCloseOnOff: {
      type: Boolean,
      default: true,
    },
    QurekaBackInterOnOff: {
      type: Boolean,
      default: true,
    },
    // Unity Ads
    UnityOnOff: {
      type: Boolean,
      default: true,
    },
    UnityFullScreenIdOnOff: {
      type: Boolean,
      default: true,
    },
    UnityInterId: {
      type: String,
      default: '',
    },
    UnityNative: {
      type: String,
      default: '',
    },
    // General config
    HomeNativeBackgroundColorOnOff: {
      type: Boolean,
      default: true,
    },
    NativeBackgroundColor: {
      type: String,
      default: '#252525',
    },
    AllPagesNativeBackgroundOnOff: {
      type: Boolean,
      default: true,
    },
    AllPagesNativeBackgroundCount: {
      type: Number,
      default: 4,
    },
    PolicyLink: {
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
