import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface SessionSlice {
	chave_sessao : string
};

const initialState : SessionSlice = {
	chave_sessao: ''
};

const sessionSlice = createSlice({
	name: 'session',
	initialState: initialState,
	reducers: {
		loadKey: (state, action: PayloadAction<string>) => {
			state.chave_sessao = action.payload;
		},
		clearKey: (state) => state = initialState,
	}
});

export const {
	clearKey,
	loadKey
} = sessionSlice.actions;

export const selectSessionKey = (state : RootState) => state.session.chave_sessao;

export const SessionReducer = sessionSlice.reducer;
