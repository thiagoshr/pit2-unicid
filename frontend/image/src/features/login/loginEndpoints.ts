import { API_TAG_LOGIN, ApiSuccessResult, cafeteriaApi } from "../../services/api";

export interface LoginParams {
	usuario : string,
	senha : string
}

export interface SessionData {
	chave_sessao : string,
	tipo : number
}

const loginEndpoints = cafeteriaApi.injectEndpoints({
	endpoints: (build) => ({
		reauth: build.query<SessionData, string>({
			query: (chave_sessao) => ({
				url: 'auth/reauth',
				body: {chave_sessao}
			}),
			transformResponse: (result : ApiSuccessResult<SessionData>) => {
				return result.data[0];
			},
			providesTags: (result) => result ? [{type: API_TAG_LOGIN, id: 'session-data'}] : []
		}),
		login: build.mutation<SessionData, LoginParams>({
			query: ({usuario, senha}) => ({
				url: 'auth/login',
				body: {usuario, senha}
			}),
			transformResponse: (result : ApiSuccessResult<SessionData>) => {
				return result.data[0]
			},
			invalidatesTags: (result) => result ? [{ type: API_TAG_LOGIN, id: 'session-data'}] : []
		}),
		logout: build.mutation<{success: boolean}, string>({
			query: (chave_sessao) => ({
				url: 'auth/logout',
				body: {chave_sessao}
			}),
			transformResponse: (result: ApiSuccessResult<any[]>) => ({
				success: result.success
			}),
			invalidatesTags: (result) => result?.success ? [{ type: API_TAG_LOGIN, id: 'session-data'}] : []
		})
	})
});

export const {
	useReauthQuery,
	useLoginMutation,
	useLogoutMutation
} = loginEndpoints;
