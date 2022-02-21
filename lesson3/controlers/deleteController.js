 const users=require('../db/users')

  class DeleteController {
    renderDelete(req,res){
        const {userId} = req.params;
        users.splice(+userId - 1, 1);
        res.redirect('/users');
    }
  }
  module.exports=new DeleteController;