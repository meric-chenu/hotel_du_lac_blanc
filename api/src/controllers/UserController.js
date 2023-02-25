const {User} = require("../models")
module.exports = {
    async deleteUser(req,res){
        try{
            const token = req.user.token
            const user = await User.findOne({
                where: {
                    token: token
                }
            })
            if(user){
                await User.destroy({
                    where: {
                        id_user: user.toJSON().id_user
                    }
                }).then(() => {
                    res.status(200).send({
                        message: "Votre compte a été supprimé"
                    })
                })
            }
            else{
                res.status(404).send({
                    message: "L'utilisateur n'a pas été trouvé. Veuillez réessayer"
                })
            }
        }
        catch(err){
            res.status(500).send({
                message: "Une erreur interne est survenue. Veuillez réessayer " + err
            })
        }
    },

}