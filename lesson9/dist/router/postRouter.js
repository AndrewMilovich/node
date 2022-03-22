"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouter = void 0;
const express_1 = require("express");
const controller_1 = require("../controller");
const router = (0, express_1.Router)();
router.get('/', controller_1.postController.getPosts);
router.get('/:userId', controller_1.postController.getPostById);
router.patch('/:userId', controller_1.postController.updatePost);
exports.postRouter = router;
//# sourceMappingURL=postRouter.js.map