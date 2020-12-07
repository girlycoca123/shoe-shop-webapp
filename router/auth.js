const upload = require('../services/ImageUpload')
const express = require("express");
const routes = express.Router();
const { login, register } = require("../controller/authController")

routes.route("/register").post(upload.single('profile'), register);
routes.route("/login").post(login);

module.exports = routes;