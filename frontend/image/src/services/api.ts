import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface QueryParams  {
	url : string,
	params : any
};

export interface CafeteriaApiBasics {
	success : boolean
};

export interface SuccessApiResponse<T> extends CafeteriaApiBasics {
	data : Array<T>,
	error? : never
};

export interface FailApiResponse extends CafeteriaApiBasics {
	data? : never,
	error: string
}

export type CafeteriaApiResponse<T> = SuccessApiResponse<T> | FailApiResponse;

export const API_TAG_LOGIN = 'login-data';

export const cafeteriaApi = createApi({
	reducerPath: 'cafeteriaApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'api/',
		method: 'POST',
		headers: {'content-type': 'multipart/form-data'}
	}),
	endpoints: () => ({}),
	tagTypes: [
		API_TAG_LOGIN
	]
})

