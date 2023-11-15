import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
	Container,
	Stack,
	Typography,
	Button
} from '@mui/material';

import {
	useReauthQuery
} from '../login/loginEndpoints';

import { selectSessionKey } from '../login/sessionSlice';

export default function GerenteUI (props : any) {
	const navigate = useNavigate();
	const sessionKey = useSelector(selectSessionKey);

	const sessionData = useReauthQuery(sessionKey);

	return (
		<Container maxWidth='md'>
			<Stack sx={{ gap: 2, pt: 2}}>
				{sessionData.isSuccess &&
					<Typography variant='h5'>
						Bem vindo(a), {sessionData.data.nome}!
					</Typography>
				}
				<Button
					variant='outlined'
					fullWidth
					onClick={() => navigate('')}
				>Cadastro de Produtos</Button>
			</Stack>
		</Container>
	);
}
