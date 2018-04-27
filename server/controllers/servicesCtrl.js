module.exports = {
    getServices: async (req, res) => {
        //combines all the sevices tables and sends one object to front end along with any promotions

        const db = req.app.get('db'),
            openTimes = await db.get_open_times(),
            mainServices = await db.get_main_services(),
            upholstery = await db.get_upholstery(),
            extras = await db.get_extras(),
            promotions = await db.get_promotions()
        let body = {
            openTimes,
            mainServices,
            upholstery,
            extras,
            promotions
        }
        res.status(200).send(body)

    },
    updateCarpetPrice: (req, res) => {
        //updates square footage price of the carpet service
        // takes in number param off body

        const db = req.app.get('db'),
            { price } = req.body

        db.update_carpet_price(price)
            .then(() => res.send(200).send('price updated'))
    },
    updateGroutPrice: (req, res) => {
        //updates square footage price of the grout service
        // takes in number param off body

        const db = req.app.get('db'),
            { price } = req.body

        db.update_grout_price(price)
            .then(() => res.send(200).send('price updated'))
    },
    addUpholstery: (req, res) => {
        // add an upholstery piece 
        // takes in upholstery object: upholstery_name, upholstery_price 

        const db = req.app.get('db'),
            { upholstery_name, upholstery_price } = req.body

        db.create_upholstery([upholstery_name, upholstery_price])
            .then(() => res.status(200).send('piece added'))
    },
    updateUpholstery: (req, res) => {
        // updates price upholestery piece
        // takes in upholster object: upholstery_id, upholstery_name, upholstery_price

        const db = req.app.get('db'),
            { upholstery_id, upholstery_name, upholstery_price } = req.body

        db.update_upholstery([upholstery_id, upholstery_name, upholstery_price])
            .then(() => res.status(200).send('piece update'))
    },
    deleteUpholstery: (req, res) => {
        // deletes selected upholstery piece
        // takes in upholstery id num

        const db = req.app.get('db'),
            { upholstery_id } = req.body

        db.delete_upholstery(upholstery_id)
            .then(() => res.status(200).send('piece deleted'))
    },
    addExtraServices: (req, res) => {
        // adds other services
        // takes in extra service object: name, description

        const db = req.app.get('db'),
            { extra_name, extra_description } = req.body

        db.create_extra([extra_name, extra_description])
            .then(() => res.status(200).send('extra service added'))
    },
    deleteExtraServices: (req, res) => {
        // deletes extra services
        // takes in extra service id num

        const db = req.app.get('db'),
            { extra_id } = req.body

        db.delete_extra(extra_id)
            .then(() => res.status(200).send('extra service deleted'))
    },
    addPromotion: (req, res) => {
        //adds promotion
        //takes in promotion object: name, discount, end_date ('year-mo-dy' format), affecting 
        
        const db = req.app.get('db'),
            { promotion_name, discount, end_date, affecting } = req.body

        db.create_promotion([promotion_name, discount, end_date, affecting])
            .then(() => res.status(200).send('promotion added'))
    }
} 