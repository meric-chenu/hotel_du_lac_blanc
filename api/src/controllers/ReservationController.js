const {User,Reservation,Booked,Bedroom} = require("../models");
const { Op } = require('sequelize');
module.exports = {
    async bookBedroom(req,res){
        const {title,arrivee,depart,adult_number,child_number} = req.body;
        if(arrivee >= depart){
            res.status(401).send({
                message: "La date est invalide"
            })
        }
        else{
            try{
                const token = req.user.token;
                //Search for the room
                const bedroom = await Bedroom.findOne({
                    where: {
                        title: title
                    }
                })
                if(bedroom){
                    //find all reservation in the same period
                    const reservation = await Reservation.findAll({
                        where: {
                            [Op.or]: [
                                {
                                    depart: {
                                        [Op.between]: [arrivee,depart]
                                    }
                                }, 
                                {
                                    arrivee: {
                                        [Op.between]: [arrivee,depart]
                                    }
                                }
                            ]
                        },
                        raw:true
                    })
                    if(reservation.length > 0){
                        //Let's find if the reservation is for the same room
                        let booked;
                        let index = 0;
                        while (index < reservation.length){
                            booked = await Booked.findOne({
                                where: {
                                    id_booked: reservation[index].id_booked
                                }
                            })
                            if(booked && booked.toJSON().booked){
                                //Find if the servation is for the same room
                                const bedroom = await Bedroom.findOne({
                                    where: {
                                        title: title
                                    }
                                })
                                if(bedroom && bedroom.toJSON().id_bedroom === booked.toJSON().id_bedroom){
                                    res.status(401).send({
                                        message: "Cette chambre a déjà été réservée pour cette date"
                                    })
                                    index = reservation.length;
                                }
                                else{
                                    //We can create the reservation for the room
                                    const bookedCreation = await Booked.create({
                                        booked: true,
                                        id_bedroom: bedroom.toJSON().id_bedroom,
                                        id_reservation: 0
                                    })
                                    if(bookedCreation){
                                        reservationCreated = await Reservation.create({
                                            email: req.user.email,
                                            adult_number: adult_number,
                                            child_number: child_number,
                                            arrivee: arrivee,
                                            depart: depart,
                                            id_booked: bookedCreationJson.id_booked
                                        })
                                        if(reservationCreated){
                                            bookedCreation.update({
                                                id_reservation: reservationCreated.toJSON().id_reservation
                                            }).then(() => {
                                                res.status(200).send({
                                                    message: "La réservation a été créée"
                                                })
                                                index = reservation.length;
                                            })
                                        }
                                    }
                                    else{
                                        res.status(500).send({
                                            message: "Une erreur interne est survenue. Veuillez réessayer"
                                        })
                                    }
                                }
                            }
                            else{
                                //We can create the reservation for the room
                                const bookedCreation = await Booked.create({
                                    booked: true,
                                    id_bedroom: bedroom.toJSON().id_bedroom,
                                    id_reservation: 0
                                })
                                if(bookedCreation){
                                    const bookedCreationJson = bookedCreation.toJSON()
                                    reservationCreated = await Reservation.create({
                                        email: req.user.email,
                                        adult_number: adult_number,
                                        child_number: child_number,
                                        arrivee: arrivee,
                                        depart: depart,
                                        id_booked: bookedCreationJson.id_booked
                                    })
                                    if(reservationCreated){
                                        bookedCreation.update({
                                            id_reservation: reservationCreated.toJSON().id_reservation
                                        }).then(() => {
                                            res.status(200).send({
                                                message: "La réservation a été créée"
                                            })
                                            index = reservation.length;
                                        })
                                    }
                                }
                                else{
                                    res.status(500).send({
                                        message: "Une erreur interne est survenue. Veuillez réessayer"
                                    })
                                    index = reservation.length;
                                }
                            }
                        }
                        index+=1
                    }
                    else{

                        //We can create the reservation for the room
                        const bookedCreation = await Booked.create({
                            booked: true,
                            id_bedroom: bedroom.toJSON().id_bedroom,
                            id_reservation: 0
                        })
                        if(bookedCreation){
                            reservationCreated = await Reservation.create({
                                email: req.user.email,
                                adult_number: adult_number,
                                child_number: child_number,
                                arrivee: arrivee,
                                depart: depart,
                                id_booked: bookedCreation.toJSON().id_booked
                            })

                            if(reservationCreated){
                                bookedCreation.update({
                                    id_reservation: reservationCreated.toJSON().id_reservation
                                }).then(() => {
                                    res.status(200).send({
                                        message: "La réservation a été créée"
                                    })
                                })
                            }
                        }
                        else{
                            res.status(500).send({
                                message: "Une erreur interne est survenue. Veuillez réessayer"
                            })
                            
                        }
                    }
                }
                else{
                    res.status(404).send({
                        message: "Impossible de trouver la chambre spécifiée"
                    })
                }
            }
            catch(err){
                res.status(500).send({
                    message: "Une erreur interne est survenue. Veuillez réessayer " + err
                })
            }
        }
    },
    //Code to test, and use function in createBooking (verify date)
    async modifyBooking(req,res){
        const {id_reservation,arrivee,depart,adult_number,child_number} = req.body
        try{
            const token = req.user.token;
            const user = await User.findOne({
                where: {
                    token: token
                }
            })
            if(user){
                const reservation = await Reservation.findOne({
                    where: {
                        id_reservation: id_reservation
                    }
                })
                if(reservation){
                    const reservationJson = reservation.toJSON();
                    if(reservationJson.email === user.toJSON().email){
                        reservation.update({
                            arrivee: arrivee,
                            depart: depart,
                            child_number: child_number,
                            adult_number: adult_number
                        }).then((response) => {
                            res.status(200).send({
                                message: "La réservation a été modifiée",
                                reservation: response.toJSON()
                            })
                        })
                    }
                    else{
                        res.status(401).send({
                            message: "Vous n'êtes pas autorisé à effectuer cette action"
                        })
                    }
                }
                else{
                    res.status(404).send({
                        message: "La réservation n'a pas été trouvée"
                    })
                }
            }
            else{
                res.status(404).send({
                    message: "L'utilisateur n'a pas été trouvé"
                })
            }
        }
        catch(err){
            res.status(500).send({
                message: "Une erreur interne est survenue. Veuillez réessayer"
            })
        }
    },
    async deleteBooking(req,res){
        const {id_reservation} = req.body 
        try{
            const token = req.user.token
            const user = await User.findOne({
                where: {
                    token: token
                }
            })
            if(user){
                const reservation = await Reservation.findOne({
                    where: {
                        id_reservation: id_reservation
                    }
                })
                if(reservation){
                    const booked = await Booked.destroy({
                        where: {
                            id_reservation: reservation.toJSON().id_reservation
                        }
                    })
                    if(booked){
                        await reservation.destroy().then(() => {
                            res.status(200).send({
                                message: "La réservation a été supprimée"
                            })
                        })
                    }
                    else{
                        res.status(500).send({
                            message: "Une erreur interne est survenue. Veuillez réessayer"
                        })
                    }
                }
                else{
                    res.status(404).send({
                        message: "La réservation n'a pas été trouvée"
                    })
                }
            }
            else{
                res.status(404).send({
                    message: "L'utilisateur n'a pas été trouvé"
                })
            }
        }
        catch(err){
            res.status(500).send({
                message: "Une erreur interne est survenue. Veuillez réessayer"
            })
        }
    },
    async getBedroomsBooked(req,res){
        try{
            const token = req.user.token
            let listBedrooms = []
            const reservation = await Reservation.findAll({
                where: {
                    email: req.user.email
                },
                raw: true
            })
            if(reservation){
                let booked;
                for(let index = 0;index<reservation.length;index+=1){
                    booked = await Booked.findOne({
                        where: {
                            id_booked: reservation[index].id_booked
                        }
                    })
                    if(booked){
                        await Bedroom.findOne({
                            where: {
                                id_bedroom: booked.toJSON().id_bedroom
                            }
                        }).then((response) => {
                            listBedrooms.push(response.toJSON())
                        })
                    }
                }
                res.status(200).send({
                    message: "Liste des chambres réservées",
                    listBedrooms: listBedrooms
                })
            }
            else{
                res.status(404).send({
                    message: "Aucune réservation disponible"
                })
            }
        }
        catch(err){
            res.status(500).send({
                message: "Une erreur interne est survenue. Veuillez réessayer " + err
            })
        }
    },
    async getInfoBooking(req,res){
        try{    
            const token = req.user.token
            const {id_reservation} = req.body;
            const reservation = await Reservation.findOne({
                where: {
                    id_reservation: id_reservation,
                    email: req.user.email
                }
            })
            if(reservation){
                res.status(200).send({
                    message: "La réservation a été trouvée",
                    reservation: reservation.toJSON()
                })
            }
            else{
                res.status(404).send({
                    message: "La réservation n'a pas été trouvée"
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