const express = require ('express');
const contactController = require ('../controllers/contactController');
const router = express.Router();


router.post('/contact-form',contactController.mailContact);
router.post('/registration-form',contactController.createStudent);





module.exports= router;