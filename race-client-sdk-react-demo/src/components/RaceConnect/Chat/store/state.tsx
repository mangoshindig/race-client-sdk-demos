/* eslint-disable */
import { combineReducers, Reducer } from 'redux';
import { WebchatReducer } from '@twilio/flex-webchat-ui'


const rootReducer = (function () {
    let reducers = { flex: WebchatReducer };
    return {
        addReducer: (slice: string, reducer: Reducer<any>) => {

                reducers = {...reducers, [slice] : reducer}


            //reducers[slice] = reducer;
        },
        combinedReducers: function () {
            return combineReducers(reducers);
        }
    };
})();

export default rootReducer;