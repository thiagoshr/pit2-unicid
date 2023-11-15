import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
	Container,
	Stack,
	Button
} from '@mui/material';


export default function GerenteUI (props : any) {
	const navigate = useNavigate();

	return (
		<Container maxWidth='md'>
			<Stack sx={{ gap: 2, pt: 2}}>
				<Button
					variant='outlined'
					fullWidth
					onClick={() => navigate('')}
				>Cadastro de Produtos</Button>
			</Stack>
		</Container>
	);
}
