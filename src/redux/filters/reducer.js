import { COLORCHANGED, STATUSCHANGED } from "./actionTypes";
import initialState from "./initialState";

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case STATUSCHANGED:
            return {
                ...state,
                status: action.payload,
            };

        case COLORCHANGED:
            // ekhane color add or remove duitai korte hobe
            const { color, changeType } = action.payload;

            switch (changeType) {
                case "added":
                    return {
                        ...state,
                        colors: [...state.colors, color],
                    };

                case "removed":
                    // jei color ta she remove korte cheyeche .. sheita bad e baki color
                    // gula amra filter kore dibo
                    return {
                        ...state,
                        colors: state.colors.filter(
                            (existingColor) => existingColor !== color
                        ),
                    };

                default:
                    return state;
            }

        default:
            return state;
    }
};

export default reducer;
