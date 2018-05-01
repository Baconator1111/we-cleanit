const initialState = {
    contactInfo: {},
    sqftCarpet: 0,
    sqftGrout: 0,
    upholstery: [],
    otherServices: {},
    frequency: null
}

const UPDATE_CONTACT_INFO = 'UPDATE_CONTACT_INFO',
    UPDATE_SQFT_CARPET = 'UPDATE_SQFT_CARPET',
    UPDATE_SQFT_GROUT = 'UPDATE_SQFT_GROUT',
    UPDATE_UPHOLSTERY = 'UPDATE_UPHOLSTERY',
    UPDATE_OTHER_SERVICES = 'UPDATE_OTHER_SERVICES',
    UPDATE_FREQUENCY = 'UPDATE_FREQUENCY',
    CLEAR_STATE = 'CLEAR_STATE'

module.exports = {
    updateContactInfo: function (contactInfo) {
        return {
            type: UPDATE_CONTACT_INFO,
            payload: contactInfo
        }
    },
    updateSQFTCarpet: function (sqftCarpet) {
        return {
            type: UPDATE_SQFT_CARPET,
            payload: sqftCarpet
        }
    },
    updateSQFTGrout: function (sqftGrout) {
        return {
            type: UPDATE_SQFT_GROUT,
            payload: sqftGrout
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
    udpateFrequency: function (frequency) {
        return {
            type: UPDATE_FREQUENCY,
            payload: frequency
        }
    },
    clearState: function () {
        return { type: CLEAR_STATE }
    },


    reducer: function (state = initialState, action) {
        switch (action.type) {
            case UPDATE_CONTACT_INFO:
                return Object.assign({}, state, { contactInfo: action.payload });

            case UPDATE_SQFT_CARPET:
                return Object.assign({}, state, { sqftCarpet: action.payload });

            case UPDATE_SQFT_GROUT:
                return Object.assign({}, state, { sqftGrout: action.payload });

            case UPDATE_UPHOLSTERY:
                return Object.assign({}, state, { upholstery: action.payload });

            case UPDATE_OTHER_SERVICES:
                return Object.assign({}, state, { otherServices: action.payload });

            case UPDATE_FREQUENCY:
                return Object.assign({}, state, { frequency: action.payload });
            case CLEAR_STATE:
                return Object.assign({}, initialState);
            default:
                return state;
        }
    }
}