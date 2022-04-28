const INITIAL_STATE = {
    usuarioEmail: " ",
    usuarioLogado: false,
};

function usuarioReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case "LOG_IN":
            return {
                ...state,
                usuarioLogado: true,
                usuarioEmail: action.usuarioEmail,
            };
        case "LOG_OUT":
            return { ...state, usuarioLogado: false, usuarioEmail: null };
        default:
            return state;
    }
}
export default usuarioReducer;
