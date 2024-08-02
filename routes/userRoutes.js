const express = require('express');
const { createUser, getUsers, updateUser, deleteUser, signinUser, getProfile } = require('../controllers/userController');
const authenticateJWT = require('../middleware/authenticateJWT');

const router = express.Router();

router.post('/users', createUser);
router.get('/users', authenticateJWT, getUsers);
router.put('/users/:id', authenticateJWT, updateUser);
router.delete('/users/:id', authenticateJWT, deleteUser);
router.post('/users/login', signinUser);
router.get('/users/profile', authenticateJWT, getProfile);

module.exports = router;
