const {Bedroom} = require("../models")
module.exports = {
    async createBedroom(req,res){
        const {title,capacity,air_conditioned,wifi,television,fridge,dishes,phone,drink,begin_price} = req.body;
        try{
            const bedroom = await Bedroom.findOne({
                where: {
                    title: title
                }
            })
            if(!bedroom){
                await Bedroom.create({
                    title: title,
                    capacity: capacity,
                    air_conditioned: air_conditioned,
                    wifi: wifi,
                    television: television,
                    fridge: fridge,
                    dishes: dishes,
                    phone: phone,
                    drink: drink,
                    begin_price: begin_price
                }).then(() => {
                    res.status(200).send({
                        message: "La chambre a été créée"

                    })
                })
            }
            else{
                res.status(401).send({
                    message: "Impossible de créer une nouvelle chambre avec le même titre !"
                })
            }
        }
        catch(err){
            res.status(500).send({
                message: "Une erreur interne est survenue. Veuillez réessayer."
            })
        }
    },
    async getBedrooms(req,res){
        try{
            const bedrooms = await Bedroom.findAll({
                raw: true
            });
            if(bedrooms){
                res.status(200).send({
                    message: "Retour des chambes",
                    bedrooms: bedrooms
                })
            }
            else{
                res.status(500).send({
                    message: "Une erreur interne est survenue. Veuillez réessayer"
                })
            }

        }
        catch(err){
            res.status(500).send({
                message: "Une erreur interne est survenue. Veuillez réessayer"
            })
        }
    },
    async infoBedroom(req,res){
        try{
            const {title} = req.body;
            const bedroom = await Bedroom.findOne({
                where: {
                    title: title
                }
            })
            if(bedroom){
                res.status(200).send({
                    message: "La chambre a été trouvée",
                    bedroom: bedroom.toJSON()
                })
            }
            else{
                res.status(404).send({
                    message: "La chambre n'a pas été trouvée"
                })
            }
        }
        catch(err){
            res.status(500).send({
                message: "Une erreur interne est survenue. Veuillez réessayer"
            })
        }
    }
}