/**
 * @swagger
 * definitions:
 *   TeacherSchema:
 *     type: object
 *     properties:
 *       _id:
 *         type: number
 *       fullname:
 *         type: object
 *         properties:
 *           firstname:
 *             type: string
 *           lastname:
 *             type: string
 *       email:
 *         type: string
 *       password:
 *         type: string
 *       image:
 *         type: string
 *       role:
 *         type: string
 *         enum:
 *           - teacher
 *
 * securityDefinitions:
 *   bearerAuth:
 *     type: apiKey
 *     name: Authorization
 *     in: header
 *
 * /teachers:
 *   get:
 *     summary: Get all teachers
 *     responses:
 *       200:
 *         description: A list of teachers
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/TeacherSchema'
 *
 *   post:
 *     summary: Add a new teacher
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/TeacherSchema'
 *     responses:
 *       201:
 *         description: Teacher added successfully
 *         schema:
 *           $ref: '#/definitions/TeacherSchema'
 *
 *   put:
 *     summary: Update teacher data
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/TeacherSchema'
 *     responses:
 *       200:
 *         description: Teacher data updated successfully
 *         schema:
 *           $ref: '#/definitions/TeacherSchema'
 *
 *   delete:
 *     summary: Delete a teacher
 *     parameters:
 *       - in: body
 *         name: teacher
 *         required: true
 *         schema:
 *           $ref: '#/definitions/TeacherSchema'
 *     responses:
 *       200:
 *         description: Teacher deleted successfully
 *         schema:
 *           $ref: '#/definitions/TeacherSchema'
 *
 * /teachers/{id}:
 *   get:
 *     summary: Get a teacher by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: Data for the specific teacher
 *         schema:
 *           $ref: '#/definitions/TeacherSchema'
 *
 * /teachers/supervisors:
 *   get:
 *     summary: Get all supervisors
 *     responses:
 *       200:
 *         description: A list of supervisors
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/TeacherSchema'
 *
 * /teachers/changepassword:
 *   patch:
 *     summary: Change teacher's password
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
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             message:
 *               type: string
 *             data:
 *               $ref: '#/definitions/TeacherSchema'
 */

const express = require("express");
const controller=require("./../Controllers/teacherController");
const upload=require("../MiddleWares/uploadImage");
const {insertArray}=require("../MiddleWares/validator/teacherValidation");
const validate=require("../MiddleWares/validationMW");
const {isAdmin,isTeacher}=require("../MiddleWares/authMW");
const router=express.Router();
router.route("/teachers")
            .all(isAdmin)
            .get(controller.getallTeachers)
            .post(upload,insertArray,validate,controller.addnewTeacher)
            .put(upload,insertArray,validate,controller.updateTeacherData)
            .delete(controller.deleteTeacher);
            
router.get("/teacher/supervisors",isAdmin, controller.getAllSupervisors );
router.get("/teachers/:id", isAdmin,controller.getteacherById);
router.patch("/teachers/changepassword",isAdmin,controller.changePassword);


module.exports=router;