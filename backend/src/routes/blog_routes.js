const express = require('express');
const blogController = require('../controllers/blog_controller');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const app = express();

app.use(express.static("D:/project/blog/frontend/public"));

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "D:/project/blog/frontend/public");
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({ storage });

router.get('/', blogController.getBlogs);
router.get('/myblogs', blogController.getMyBlogs);
router.get('/:id', blogController.getBlogById);
router.post('/', upload.single('image'), blogController.createBlog);
router.put('/:id', blogController.updateBlog);
router.delete('/:id', blogController.deleteBlog);

module.exports = router;