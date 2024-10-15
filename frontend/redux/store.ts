import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({ serializableCheck: false }).concat(sagaMiddleware)
    }
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;