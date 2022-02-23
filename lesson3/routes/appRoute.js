const {Router}=require('express')

const router=Router();
const loginRouter=require('./loginRouter');
const usersRouter=require('./usersRouter');
const signInRouter=require('./signInRouter');

router.use('/login',loginRouter);
router.use('/users',usersRouter);
router.use('/users/:userId',usersRouter);
router.use('/signIn',signInRouter);

module.exports=router;