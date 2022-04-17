const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const adsConfigValidation = require('../../validations/adsConfig.validation');
const adsConfigController = require('../../controllers/adsConfig.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageAdsConfigs'), validate(adsConfigValidation.createAdsConfig), adsConfigController.createAdsConfig)
  .get(auth('getAdsConfigs'), validate(adsConfigValidation.getAdsConfigs), adsConfigController.getAdsConfigs);

router
  .route('/:adsConfigId')
  .get(auth('getAdsConfigs'), validate(adsConfigValidation.getAdsConfig), adsConfigController.getAdsConfig)
  .put(auth('manageAdsConfigs'), validate(adsConfigValidation.updateAdsConfig), adsConfigController.updateAdsConfig)
  .delete(auth('manageAdsConfigs'), validate(adsConfigValidation.deleteAdsConfig), adsConfigController.deleteAdsConfig);

router
  .route('/package/:adsConfigId')
  .get(
    auth('getAdsConfigs'),
    validate(adsConfigValidation.getAdsConfigFromPackageName),
    adsConfigController.getAdsConfigFromPackageName
  );

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: AdsConfigs
 *   description: AdsConfig management and retrieval
 */

/**
 * @swagger
 * /adsConfigs:
 *   post:
 *     summary: Create a adsConfig
 *     description: Only admins can create other adsConfigs.
 *     tags: [AdsConfigs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *                 description: must be unique
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 description: At least one number and one letter
 *               role:
 *                  type: string
 *                  enum: [adsConfig, admin]
 *             example:
 *               name: fake name
 *               email: fake@example.com
 *               password: password1
 *               role: adsConfig
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/AdsConfig'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all adsConfigs
 *     description: Only admins can retrieve all adsConfigs.
 *     tags: [AdsConfigs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: AdsConfig name
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *         description: AdsConfig role
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of adsConfigs
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/AdsConfig'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /adsConfigs/{id}:
 *   get:
 *     summary: Get a adsConfig
 *     description: Logged in adsConfigs can fetch only their own adsConfig information. Only admins can fetch other adsConfigs.
 *     tags: [AdsConfigs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: AdsConfig id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/AdsConfig'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a adsConfig
 *     description: Logged in adsConfigs can only update their own information. Only admins can update other adsConfigs.
 *     tags: [AdsConfigs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: AdsConfig id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *                 description: must be unique
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 description: At least one number and one letter
 *             example:
 *               name: fake name
 *               email: fake@example.com
 *               password: password1
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/AdsConfig'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a adsConfig
 *     description: Logged in adsConfigs can delete only themselves. Only admins can delete other adsConfigs.
 *     tags: [AdsConfigs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: AdsConfig id
 *     responses:
 *       "200":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
