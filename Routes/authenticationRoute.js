
/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API endpoints for user authentication
 * 
 * /auth/login:
 *   post:
 *     summary: Authenticate user
 *     description: Logs in a user and returns an authentication token.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *       401:
 *         description: Authentication failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

const express = require("express");
const controller = require("../Controllers/authentication");
const route = express.Router();

route.post("/login", controller.login);

module.exports = route;

