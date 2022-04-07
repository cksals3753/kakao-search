import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

/** 비동기 함수 구현 */
// payload는 이 함수를 호출할 때 전달되는 파라미터.
export const getBookList = createAsyncThunk(
    'BOOK/GET_LIST',
    async (payload, { rejectWithValue }) => {
        let result = null;
        if (payload.query) {
            try {
                const apiUrl = 'https://dapi.kakao.com//v3/search/book';
                result = await axios.get(apiUrl, {
                    params: {
                        query: payload.query,
                        page: payload.page,
                        size: 20,
                    },
                    headers: {
                        Authorization: 'KakaoAK',
                    },
                });
            } catch (e) {
                result = rejectWithValue(e.response);
            }
        }
        return result;
    }
);

/** Slice 정의 (Action 함수 + Reducer의 개념) */
export const bookSlice = createSlice({
    name: 'book',
    initialState: {
        rt: null, //HTTP 상태 코드 (200, 404, 500등)
        rtmsg: null, //에러메시지
        item: [], //ajax 처리를 통해 수신된 데이터
        loading: false,
    },
    //내부 action 및 동기 action (Ajax 처리시에는 사용하지 않음)
    reducers: {},
    extraReducers: {
        [getBookList.pending]: (state, { payload }) => {
            return { ...state, loading: true };
        },
        [getBookList.fulfilled]: (state, { meta, payload }) => {
            if (meta.arg.page > 1) {
                payload.data.documents = state.item.documents.concat(payload.data.documents);
            }
            return {
                ...state,
                rt: payload.status,
                rtmsg: payload.statusText,
                item: payload.data,
                loading: false,
            };
        },
        [getBookList.rejected]: (state, { payload }) => {
            return {
                ...state,
                rt: payload?.status ? payload.status : '500',
                rtmsg: payload?.statusText ? payload.statusText : 'Server Error',
                item: payload.data,
                loading: false,
            };
        },
    },
});

//리듀서 객체 내보내기
export default bookSlice.reducer;
