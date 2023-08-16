const { Router } = require('express');
const router = new Router()

const homeController = require('../controllers/homeController.js');

// @desc render home page middleware
// @route GET /
router.get("/" , homeController.renderHomePage)

// @desc save note route
// @route POST /save-note
router.post("/save-note" , homeController.saveNote)

// @desc delete all notes
// @route GET /delete-notes
router.get("/delete-notes" , homeController.deleteNotes)

module.exports = router