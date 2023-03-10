const AuthController = require('../controllers/AuthController.js');
const BedroomController = require('../controllers/BedroomController.js');
const UserController = require("../controllers/UserController.js");
const ReservationController = require("../controllers/ReservationController.js");
const verifyToken = require("../middleware/auth.js");
const Bedroom = require('../models/Bedroom.js');


module.exports = (app) => {
    app.post('/register',AuthController.register);
    app.post('/login',AuthController.login);
    app.put('/logout',verifyToken,AuthController.logout);
    app.post('/createBedroom',BedroomController.createBedroom);
    app.get('/getBedrooms',BedroomController.getBedrooms);
    app.get('/infoBedroom',BedroomController.infoBedroom);
    app.post('/bookBedroom',verifyToken,ReservationController.bookBedroom);
    app.put('/modifyBooking',verifyToken,ReservationController.modifyBooking);
    app.delete('/deleteBooking',verifyToken,ReservationController.deleteBooking);
    app.get('/bedroomBooked',verifyToken,ReservationController.getBedroomsBooked);
    app.get('/infoBooking',verifyToken,ReservationController.getInfoBooking);
    app.delete('/deleteUser',verifyToken,UserController.deleteUser);
}