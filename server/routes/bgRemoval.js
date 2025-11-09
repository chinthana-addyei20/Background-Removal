import express from 'express';
import multer from 'multer';
import { removeBackground } from '../controllers/bgRemoval.js';

const router = express.Router();

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Background removal endpoint
router.post('/remove-background', upload.single('image'), removeBackground);

export default router;