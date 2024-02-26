/**
 * @swagger
 * components:
 *   schemas:
 *     ClassSchema:
 *       type: object
 *       properties:
 *         _id:
 *           type: number
 *         name:
 *           type: string
 *         supervisor:
 *           type: object
 *           properties:
 *             _id:
 *               type: number
 *         children:
 *           type: array
 *           items:
 *             type: number
 *   securitySchemes:
 *     bearerAuth:
 *       type: apiKey
 *       name: Authorization
 *       in: header
 *
 * /class:
 *   get:
 *     summary: Retrieve all classes
 *     description: Returns a list of all classes.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of classes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ClassSchema'
 *   post:
 *     summary: Add a new class
 *     description: Adds a new class to the system.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ClassSchema'
 *     responses:
 *       201:
 *         description: Class added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ClassSchema'
 *   put:
 *     summary: Update class data
 *     description: Updates data for an existing class.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ClassSchema'
 *     responses:
 *       200:
 *         description: Class data updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ClassSchema'
 *   delete:
 *     summary: Delete a class
 *     description: Deletes a class from the system.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Class deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ClassSchema'
 * /class/{id}:
 *   get:
 *     summary: Retrieve a specific class by ID
 *     description: Returns data for a specific class based on the provided ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the class to retrieve
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Data for the specific class
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ClassSchema'
 * /classChildren/{id}:
 *   get:
 *     summary: Retrieve children for a specific class by ID
 *     description: Returns data for children belonging to a specific class based on the provided ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the class to retrieve children for
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Data for the children in the specific class
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ChildSchema'
 * /classTeacher/{id}:
 *   get:
 *     summary: Retrieve teacher for a specific class by ID
 *     description: Returns data for the teacher assigned to a specific class based on the provided ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the class to retrieve teacher for
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Data for the teacher in the specific class
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: number
 *               
 */


const express = require("express");
const controller=require("./../Controllers/classController");
const {insertArray}=require("../MiddleWares/validator/classValidation");
const validate=require("../MiddleWares/validationMW");
const router=express.Router();
const {isAdmin,isTeacher}=require("./../MiddleWares/authMW");

router.route("/class")
            .all(isTeacher)
            .get(controller.getallClasses)
            .post(insertArray,validate,controller.addClassData)
            .put(insertArray,validate,controller.updateClassuser)
            .delete(controller.deleteClass);

router.get("/class/:id",isTeacher,controller.getClassById);
router.get("/classChildren/:id",isTeacher,controller.getClassChildren);
router.get("/classTeacher/:id",isTeacher,controller.getClassTeacher);
module.exports=router;