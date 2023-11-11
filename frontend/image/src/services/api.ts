import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const API_TAG_LOGIN = 'login-data';

export interface ApiSuccessResult<T> {
	success: boolean,
	data: Array<T>,
	error? : never
};

export interface ApiFailResult {
	success: boolean,
	error: string,
	data? : never
};

export const cafeteriaApi = createApi({
	reducerPath: 'cafeteriaApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'api/',
		method: 'POST'
	}),
	endpoints: () => ({}),
	tagTypes: [
		API_TAG_LOGIN
	]
})

