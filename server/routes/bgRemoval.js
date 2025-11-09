import express from 'express';
import multer from 'multer';
import { removeBackground } from '../controllers/bgRemoval.js';
import { getAll as getAllRecords, getById } from '../utils/storage.js'

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

// List processed images
router.get('/images', (req, res) => {
    const all = getAllRecords()
    res.json({ success: true, images: all })
})

// Get single image metadata by id
router.get('/images/:id', (req, res) => {
    const rec = getById(req.params.id)
    if (!rec) return res.status(404).json({ error: 'Not found' })
    res.json({ success: true, image: rec })
})

export default router;