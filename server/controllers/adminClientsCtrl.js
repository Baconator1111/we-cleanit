module.exports = {
    updateResidentialContacted: (req, res) => {
        const db = req.app.get('db'),
            { appointment_id, status } = req.body

        db.update_residential_contacted([status, appointment_id])
            .then(() => res.status(200).send('price updated'))
    },
    updateResidentialConfirmed: (req, res) => {
        const db = req.app.get('db'),
            { appointment_id, status } = req.body

        db.update_residential_confirmed([status, appointment_id])
            .then(() => res.status(200).send('price updated'))
    },
    updateCommericalContacted: (req, res) => {
        const db = req.app.get('db'),
            { commercial_id, status } = req.body

        db.update_commercial_contacted([status, commercial_id])
            .then(() => res.status(200).send('price updated'))
    },
    updateCommercialConfirmed: (req, res) => {
        const db = req.app.get('db'),
            { commercial_id, status } = req.body
        console.log(commercial_id, status)

        db.update_commercial_confirmed([status, commercial_id])
            .then(() => res.status(200).send('price updated'))
    }
}