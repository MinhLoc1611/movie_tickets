import { SET_CAROUSEL } from "../types/CarouselType"


const stateDefault = {
    arrImg: []
}

export const CarouselReducer = (state = stateDefault, action) => {
    switch (action.type) {

        case SET_CAROUSEL:{
            return {...state,arrImg:action.arrImg}
        }

        default: return { ...state }
    }
}