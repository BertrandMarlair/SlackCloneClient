const initalState = {
    network: {
        type: {
            target: null,
            intensity: [
                {
                    id: 0,
                    name: 'configurator.network.monoAvecNeutre',
                    tension: 230,
                    monophase: true,
                    neutre: true
                },
                {
                    id: 1,
                    name: 'Monophasé 230 V sans neutre L1/L2',
                    tension: 230,
                    monophase: true,
                    neutre: false
                },
                {
                    id: 2,
                    name: 'Triphasé 400V avec neutre L1/L2/L3/N',
                    tension: 400,
                    monophase: false,
                    neutre: true
                },
                {
                    id: 3,
                    name: 'Triphasé 230 V sans neutre L1/L2/L3',
                    tension: 230,
                    monophase: false,
                    neutre: false
                },
            ]
        },
        raccord: '',
        intensityMax: '',
        kw: null,
    },
}

export default function contextConfig(state = initalState, action) {
    switch (action.type) {
        case 'EDIT_NETWORK_TYPE':
            return {
                ...state,
                network: {
                    ...state.network,
                    type: {
                        ...state.network.type,
                        target: action.payload
                    }
                }
            }
        case 'EDIT_NETWORK_RACCORD':
            return {
                ...state,
                network: {
                    ...state.network,
                    raccord: action.payload
                }
            }
        case 'EDIT_NETWORK_INTENSITY':
            return {
                ...state,
                network: {
                    ...state.network,
                    intensityMax: action.payload
                }
            }
        case 'EDIT_NETWORK_KW':
            return {
                ...state,
                network: {
                    ...state.network,
                    kw: action.payload
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