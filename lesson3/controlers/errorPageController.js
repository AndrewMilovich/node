class ErrorPageController{
    renderErrorPage(req,res){
            res.render('errorPage');
    }
}
module.exports=new ErrorPageController()