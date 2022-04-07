import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { createLogger } from 'redux-logger';

import bookSlice from './slices/BookSlice';
import blogSlice from './slices/BlogSlice';
import cafeSlice from './slices/CafeSlice';
import webSlice from './slices/WebSlice';

const logger = createLogger();

const store = configureStore({
    reducer: {
        'book': bookSlice,
        'blog': blogSlice,
        'cafe': cafeSlice,
        'web': webSlice
    },
    //미들웨어를 사용하지 않을 경우 이 라인 생략 가능 (redux-thunk 사용시 필수)
    middleware: [...getDefaultMiddleware({ serializableCheck: false, }), logger],
    devTools: true
});

export default store;