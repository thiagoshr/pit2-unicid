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

import { useLoginMutation } from './loginEndpoints';
import { ApiFailResult } from '../../services/api';

export function LoginScreen() {
	const [doLogin] = useLoginMutation();

	async function handleSubmit(event : any) {
		event.preventDefault();

		const data = new FormData(event.currentTarget);
		const params = {
			usuario: data.get('username')?.toString() ?? '',
			senha: data.get('password')?.toString() ?? ''
		};
		let result = {};

		try {
			result = await doLogin(params).unwrap();
		} catch (err : any) {
			result = err;
		}
		console.log(result);
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