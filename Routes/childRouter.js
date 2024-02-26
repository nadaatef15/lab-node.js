/**
 * @swagger
 * components:
 *   schemas:
 *     ChildSchema:
 *       type: object
 *       properties:
 *         _id:
 *           type: number
 *         fullname:
 *           type: object
 *           properties:
 *             firstname:
 *               type: string
 *             lastname:
 *               type: string
 *         age:
 *           type: number
 *         level:
 *           type: string
 *           enum:
 *             - PreKG
 *             - KG1
 *             - KG2
 *         address:
 *           type: object
 *           properties:
 *             city:
 *               type: string
 *             street:
 *               type: string
 *             building:
 *               type: string
 *   securitySchemes:
 *     bearerAuth:
 *       type: apiKey
 *       name: Authorization
 *       in: header
 *
 * /child:
 *   get:
 *     summary: Retrieve all children
 *     description: Returns a list of all children.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of children
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ChildSchema'
 *   post:
 *     summary: Add a new child
 *     description: Adds a new child to the system.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChildSchema'
 *     responses:
 *       201:
 *         description: Child added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ChildSchema'
 *   put:
 *     summary: Update child data
 *     description: Updates data for an existing child.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChildSchema'
 *     responses:
 *       200:
 *         description: Child data updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ChildSchema'
 *   delete:
 *     summary: Delete a child
 *     description: Deletes a child from the system.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Child deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ChildSchema'
 * /child/{id}:
 *   get:
 *     summary: Retrieve a specific child by ID
 *     description: Returns data for a specific child based on the provided ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the child to retrieve
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Data for the specific child
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ChildSchema'
 *
 * /changePassword:
 *   post:
 *     summary: Change teacher's password
 *     description: Changes the password for a teacher.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                 type: number
 *               currentPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/TeacherSchema'
 */

const express = require("express");
const controller=require("./../Controllers/childController");
const {isAdmin,isTeacher}=require("./../MiddleWares/authMW");
const{insertArray} =require("../MiddleWares/validator/classValidation");
const validate=require("../MiddleWares/validationMW");


const router=express.Router();
router.route("/child")
            .all(isAdmin)
            .get(controller.getallChildren)
            .post(insertArray,validate,controller.addnewChild)
            .put(insertArray,validate,controller.updateChildData)
            .delete(controller.deleteChild);

router.get("/child/:id",controller.getChildById);
module.exports=router;