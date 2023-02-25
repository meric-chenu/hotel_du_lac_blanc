const {Bedroom,Booked,Reservation} = require("../models")
module.exports = {
    async createBedroom(req,res){
        const {title,capacity,air_conditioned,wifi,television,fridge,dishes,phone,drink,begin_price,max_capacity} = req.body;
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
                    begin_price: begin_price,
                    max_capacity: max_capacity
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
    //get bedrooms which are not booked
    async getBedrooms(req,res){
        try{
            const bedrooms = await Bedroom.findAll({
                raw: true
            });
            if(bedrooms.length > 0){
                list_bedrooms = []
                list_busy = []
                let booked;
                let reservation;
                //We fetch for the period booked for the bedroom
                for(let index = 0;index<bedrooms.length;index+=1){
                    let busy = []
                    //Search for all reservation for the bedroom
                    booked = await Booked.findAll({
                        where: {
                            id_bedroom: bedrooms[index].id_bedroom
                        },
                        raw:true
                    })
                    if(booked.length > 0){
                        
                        for(let i = 0;i<booked.length;i+=1){
                            busy.push(booked[i])
                        }                        
                    }
                    list_busy.push(busy);
                    list_bedrooms.push(bedrooms[index]);
                }
                res.status(200).send({
                    message: "Retour des chambes",
                    bedrooms: list_bedrooms,
                    busy: list_busy
                })
            }
            else{
                res.status(404).send({
                    message: "Impossible de trouver de chambre disponible"
                })
            }

        }
        catch(err){
            res.status(500).send({
                message: "Une erreur interne est survenue. Veuillez réessayer"
            })
        }
    },
    //Return information of a bedroom
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