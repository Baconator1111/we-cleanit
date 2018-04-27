module.exports = {
    getServices: (req, res) => {
        //combines all the sevices tables and sends one object to front end along with any promotions
    },
    updateCarpetPrice: (req, res) => {
        //updates square footage price of the carpet service
        // takes in number param off body
    },
    updateGroutPrice: (req, res) => {
        //updates square footage price of the grout service
        // takes in number param off body
    },
    addUpholstery: (req, res) => {
        // add an upholstery piece 
        // takes in upholstery object: name, price 
    },
    updateUpholstery: (req, res) => {
        // updates price upholestery piece
        // takes in upholster object: name, price
    },
    deleteUpholstery: (req, res) => {
        // deletes selected upholstery piece
        // takes in upholstery id num
    },
    addExtraServices: (req, res) => {
        // adds other services
        // takes in extra service object: name, description
    },
    deleteExtraServices: (req, res) => {
        // deletes extra services
        // takes in extra service id num
    }
} 