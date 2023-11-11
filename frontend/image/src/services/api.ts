import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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

