"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentRouter = void 0;
const express_1 = require("express");
const controller_1 = require("../controller");
const router = (0, express_1.Router)();
router.get('/', controller_1.commentController.getComments);
router.get('/:userId', controller_1.commentController.getCommentById);
router.patch('/action', controller_1.commentController.updateCommentAction);
exports.commentRouter = router;
//# sourceMappingURL=commentRouter.js.map