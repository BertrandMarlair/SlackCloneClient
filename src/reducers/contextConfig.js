const initalState = {
    installation: {
        target: null,
        type: {
            resident: {
                target: null,
                name: 'resident',
                description: 'configurator.context.residentDescription',
                application: [{
                    id: 0,
                    name: 'private',
                    description: 'configurator.context.residentDescriptionPrivate'
                }, {
                    id: 1,
                    name: 'societe',
                    description: 'configurator.context.residentDescriptionSociete',
                }]
            },
            enterprise: {
                target: null,
                name: 'enterprise',
                description: 'configurator.context.enterpriseDescription',
                application: [{
                    id: 0,
                    name: 'privateParking',
                    description: 'configurator.context.enterpriseDescriptionPrivateParking',
                }, {
                    id: 1,
                    name: 'semiPrivateParking',
                    description: 'configurator.context.enterpriseDescriptionSemiPrivateParking',
                }]
            },
            horeca: {
                target: null,
                name: 'horeca',
                description: 'configurator.context.horecaDescription',
                application: [{
                    id: 0,
                    name: 'privateClientParking',
                    description: 'configurator.context.horecaPrivateClientParking',
                }, {
                    id: 1,
                    name: 'privateSemiPublicParking',
                    description: 'configurator.context.horecaPrivateSemiPublicParking',
                }]
            }
        }
    },
    bornes: {
        simple: {
            target: null,
            name: 'Simple',
            id: 'simple',
            description: 'configurator.context.borneSimple',
        },
        double: {
            target: null,
            name: 'Double',
            id: 'double',
            description: 'configurator.context.borneDouble',
        }
    },
    cars: {
        carSelect: null,
        modelCar: null,
    }
}

export default function contextConfig(state = initalState, action) {
    switch (action.type) {
        case 'EDIT_INSTALLATION_TARGET':
            return {
                ...state,
                installation: {
                    ...state.installation,
                    target: action.payload
                }
            }
        case 'EDIT_APPLICATION_TARGET':
            return {
                ...state,
                installation: {
                    ...state.installation,
                    type: {
                        ...state.installation.type,
                        [action.payload.typeName]: {
                            ...state.installation.type[action.payload.typeName],
                            target: action.payload.applicationId
                        }
                    }
                }
            }
        case 'EDIT_BORNE_SIMPLE':
            return {
                ...state,
                bornes: {
                    ...state.bornes,
                    simple: {
                        ...state.bornes.simple,
                        target: action.payload
                    }
                }
            }
        case 'EDIT_BORNE_DOUBLE':
            return {
                ...state,
                bornes: {
                    ...state.bornes,
                    double: {
                        ...state.bornes.double,
                        target: action.payload
                    }
                }
            }
        case 'SELECT_CAR':
            return {
                ...state,
                cars: {
                    ...state.cars,
                    carSelect: action.payload
                } 
            }
        case 'SELECT_MODEL':
            return {
                ...state,
                cars: {
                    ...state.cars,
                    modelCar: action.payload
                }
            }
        case 'RESTORE':
            return {
                ...initalState
            }
        default:
            return state
    }
}