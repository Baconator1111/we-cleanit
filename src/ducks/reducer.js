const axios = require('axios')

const initialState = {
    clientType: '',
    servicesInfo: {},
    contactInfo: {},
    floorSectionsCarpet: [],
    floorSectionsGrout: [],
    upholstery: [],
    otherServices: {},
    frequency: null,
    timeToClean: 0,
    priceEstimate: 0,
    adminUser: 'pending'
}

const UPDATE_CLIENT_TYPE = 'UPDATE_CLIENT_TYPE',
    GET_SERVICES = 'GET_SERVICES',
    UPDATE_CONTACT_INFO = 'UPDATE_CONTACT_INFO',
    UPDATE_FLOOR_SECTIONS_CARPET = 'UPDATE_FLOOR_SECTIONS_CARPET',
    UPDATE_FLOOR_SECTIONS_GROUT = 'UPDATE_FLOOR_SECTIONS_GROUT',
    UPDATE_UPHOLSTERY = 'UPDATE_UPHOLSTERY',
    UPDATE_OTHER_SERVICES = 'UPDATE_OTHER_SERVICES',
    UPDATE_FREQUENCY = 'UPDATE_FREQUENCY',
    UPDATE_TTC = 'UPDATE_TTC',
    UPDATE_PRICE_ESTIMATE = 'UPDATE_PRICE_ESTIMATE',
    UPDATE_ADMIN_USER = 'UPDATE_ADMIN_USER',
    CLEAR_STATE = 'CLEAR_STATE'

module.exports = {
    updateClientType: function (clientType) {
        return {
            type: UPDATE_CLIENT_TYPE,
            payload: clientType
        }
    },
    getServices: function () {
        let servicesInfo = axios.get('/api/allServices').then(resp => resp.data)
        return {
            type: GET_SERVICES,
            payload: servicesInfo
        }
    },
    updateContactInfo: function (contactInfo) {
        return {
            type: UPDATE_CONTACT_INFO,
            payload: contactInfo
        }
    },
    updateFloorSectionsCarpet: function (floorSectionsCarpet) {
        return {
            type: UPDATE_FLOOR_SECTIONS_CARPET,
            payload: floorSectionsCarpet
        }
    },
    updateFloorSectionsGrout: function (floorSectionsGrout) {
        return {
            type: UPDATE_FLOOR_SECTIONS_GROUT,
            payload: floorSectionsGrout
        }
    },
    updateUpholstery: function (upholstery) {
        return {
            type: UPDATE_UPHOLSTERY,
            payload: upholstery
        }
    },
    updateOtherServices: function (otherServices) {
        return {
            type: UPDATE_OTHER_SERVICES,
            payload: otherServices
        }
    },
    updateFrequency: function (frequency) {
        return {
            type: UPDATE_FREQUENCY,
            payload: frequency
        }
    },
    updateTTC: function (timeToClean) {
        return {
            type: UPDATE_TTC,
            payload: timeToClean
        }
    },
    updatePriceEstimate: function (priceEstimate) {
        return {
            type: UPDATE_PRICE_ESTIMATE,
            payload: priceEstimate
        }
    },
    updateAdminUser: function (adminUser) {
        return {
            type: UPDATE_ADMIN_USER,
            payload: adminUser
        }
    },
    clearState: function () {
        return { type: CLEAR_STATE }
    },


    reducer: function (state = initialState, action) {
        switch (action.type) {
            case UPDATE_CLIENT_TYPE:
                return Object.assign({}, state, { clientType: action.payload })

            case GET_SERVICES + '_FULFILLED':
                return Object.assign({}, state, { servicesInfo: action.payload })

            case UPDATE_CONTACT_INFO:
                return Object.assign({}, state, { contactInfo: action.payload })

            case UPDATE_FLOOR_SECTIONS_CARPET:
                return Object.assign({}, state, { floorSectionsCarpet: action.payload })

            case UPDATE_FLOOR_SECTIONS_GROUT:
                return Object.assign({}, state, { floorSectionsGrout: action.payload })

            case UPDATE_UPHOLSTERY:
                return Object.assign({}, state, { upholstery: action.payload })

            case UPDATE_OTHER_SERVICES:
                return Object.assign({}, state, { otherServices: action.payload })

            case UPDATE_FREQUENCY:
                return Object.assign({}, state, { frequency: action.payload })

            case UPDATE_TTC:
                return Object.assign({}, state, { timeToClean: action.payload })

            case UPDATE_PRICE_ESTIMATE:
                return Object.assign({}, state, { priceEstimate: action.payload })

            case UPDATE_ADMIN_USER:
                return Object.assign({}, state, { adminUser: action.payload })

            case CLEAR_STATE:
                return Object.assign({}, state,
                    { floorSectionsCarpet: [] },
                    { floorSectionsGrout: [] },
                    { upholstery: [] },
                    { otherServices: {} },
                    { frequency: null },
                    { timeToClean: 0 },
                    { adminUser: 'pending' },
                    { priceEstimate: 0 })

            default:
                return state;
        }
    }
}