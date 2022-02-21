const {Router}=require('express')

const router=Router();
const loginRouter=require('./loginRouter');
const usersRouter=require('./usersRouter');
const signInRouter=require('./signInRouter');
const errorPageRouter=require('./errorPageRouter');
const notFoundUserRouter=require('./notFoundUserRouter');
const deleteRouter=require('./deleteRouter')

router.use('/login',loginRouter);
router.use('/users',usersRouter);
router.use('/users/:userId',usersRouter);
router.use('/signIn',signInRouter);
router.use('/errorPageRouter',errorPageRouter);
router.use('/notFoundUserRouter',notFoundUserRouter);
router.use('/delete/:userId',deleteRouter);


module.exports=router;