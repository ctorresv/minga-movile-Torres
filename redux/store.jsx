import { configureStore } from "@reduxjs/toolkit";
import { reducer as mangasReducer, reducerAsync as mangaReducerAsync } from './reducers/mangas';

const store = configureStore({
    reducer: {
        inputManga: mangasReducer,
        manga: mangaReducerAsync,
    }
});

export default store;
