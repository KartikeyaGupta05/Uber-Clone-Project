const express = require('express');
const router = express.Router();
const {body} = require('express-validator')
const captainController = require('../controller/captain.controller');
const authMiddleware = require('../middlewares/auth.middleware');


router.post('/register', [
    body('email').isEmail().withMessage("Invalid Email"),
    body('fullName.firstName').isLength({min : 3}).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({min : 6}).withMessage('Password must be at least 6 characters long'),
    body('vehicle.color').isLength({min : 3}).withMessage('Color name must be at least 3 characters long'),
    body('vehicle.plate').isLength({min : 8}).withMessage('Plate number must be at least 8 characters long'),
    body('vehicle.capacity').isInt({min : 1}).withMessage('Capacity must be at least 1'),
    body('vehicle.vehicleType').isIn(['auto', 'car', 'motorcycle']).withMessage('Invalid vehicle type'),
],
    captainController.registerCaptain
)

router.post('/login', [
    body('email').isEmail().withMessage("Invalid Email"),
    body('password').isLength({min : 6}).withMessage('Password must be at least 6 characters long'),
],
    captainController.loginCaptain
)

router.get('/profile', authMiddleware.authCaptain , captainController.getCaptainProfile);

router.get('/logout', authMiddleware.authCaptain , captainController.logoutCaptain);


module.exports = router;