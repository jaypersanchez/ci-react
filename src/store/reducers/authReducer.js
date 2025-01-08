     // src/store/reducers/authReducer.js
     const initialState = {
        user: null,
    };

    const authReducer = (state = initialState, action) => {
        switch (action.type) {
            case 'SET_USER':
                return { ...state, user: action.payload };
            case 'LOGOUT':
                return { ...state, user: null };
            default:
                return state;
        }
    };

    export default authReducer;