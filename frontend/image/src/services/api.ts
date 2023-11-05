import { createApi } from '@reduxjs/toolkit/query/react';

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

export const cafeteriaApi = createApi({
	reducerPath: 'cafeteriaApi',
	baseQuery: async (
		args : QueryParams,
		{ signal, dispatch, getState},
		extraOptions
	) => {
		const baseUrl : String = 'api/';
		
		let formData : FormData = new FormData();
		Object.keys(args.params).forEach(key => formData.append(key, args.params[key]));
		
		try {
			const requestResult = await fetch(baseUrl + args.url, {
				method: 'POST',
				body: formData
			});

			const statusCode = requestResult.status;

			const data : any = await requestResult.json();

			if(statusCode !== 200) {
				return {error: data.error};
			}
			return {data: data.data};
		}
		catch (err : any) {
			return {error: err.toString()}
		}
	},
	endpoints: (builder) => ({

	})
})