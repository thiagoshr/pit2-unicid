import { useEffect } from 'react';
import { useLoginMutation, useReauthQuery } from './loginEndpoints';
import { useDispatch, useSelector } from 'react-redux';

import { 
	Button,
	TextField,
	Box,
	Typography,
	Container
} from '@mui/material';

import {
	LocalCafe
} from '@mui/icons-material';


import { RootState } from '../../app/store';
import { clearKey, loadKey, selectSessionKey } from './sessionSlice';

export function LoginScreen() {
	const dispatch = useDispatch();
	const [doLogin] = useLoginMutation();
	const sessionKey = useSelector<RootState, string>(selectSessionKey);
	const sessionData = useReauthQuery(sessionKey, {
		skip: sessionKey === '' || !sessionKey
	});

	useEffect(() => {
		const storedKey = localStorage.getItem('chave_sessao');
		if (storedKey && (sessionKey === '' || !sessionKey)) {
			dispatch(loadKey(storedKey));
		}
	}, [sessionKey]);

	useEffect(() => {
		if (sessionData.isError) {
			localStorage.removeItem('chave_sessao');
			dispatch(clearKey());
		}
	}, [sessionData.isError]);

	async function handleSubmit(event : any) {
		event.preventDefault();

		const data = new FormData(event.currentTarget);
		const params = {
			usuario: data.get('username')?.toString() ?? '',
			senha: data.get('password')?.toString() ?? ''
		};

		try {
			const result = await doLogin(params).unwrap();
			localStorage.setItem('chave_sessao', result.chave_sessao);
			dispatch(loadKey(result.chave_sessao));
		} catch (err : any) {
			localStorage.removeItem('chave_sessao');
			dispatch(clearKey());
		}
	}

	return (
		<Container component='main' maxWidth='sm'>
			<Box
				sx={{
					boxShadow: 3,
					borderRadius: 2,
					px: 4,
					py: 6,
					marginTop: 8,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<LocalCafe fontSize='large'/>
				<Typography component='h1' variant='h5'>
					Cafeteria Gourmet
				</Typography>

				<Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
					<TextField
						margin='normal'
						required
						fullWidth
						id='username'
						label='Usuário'
						name='username'
						autoComplete='username'
						autoFocus
					/>
					<TextField
						margin='normal'
						required
						fullWidth
						label='Senha'
						name='password'
						id='password'
						type='password'
						autoComplete='current-password'
					/>
					<Button
						type='submit'
						fullWidth
						variant='outlined'
						sx={{
							mt: theme => theme.spacing(3),
							mb: theme => theme.spacing(2)
						}}
					>
						Entrar
					</Button>

				</Box>

			</Box>
		</Container>
	);
}

export default LoginScreen;