import {
	Container,
	Stack,
	Box
} from '@mui/material';


export default function GerenteUI (props : any) {
	return (
		<Container maxWidth='md'>
			<Stack sx={{ gap: 2, pt: 2}}>
				<Box sx={{ bgcolor: '#cfe8fc', height: '50vh' }} />
				<Box sx={{ bgcolor: 'black', height: '50vh'}} />
			</Stack>
		</Container>
	);
}
