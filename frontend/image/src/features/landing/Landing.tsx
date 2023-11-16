import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useLogoutMutation, useReauthQuery } from "../login/loginEndpoints";
import { clearKey, selectSessionKey } from "../login/sessionSlice";
import { useNavigate, Outlet } from "react-router-dom";

import {
	AppBar,
	Box,
	Toolbar,
	Typography,
	IconButton,
	Container
} from '@mui/material';

import {
	LocalCafe,
	Logout
} from '@mui/icons-material';

import { useEnforceHomePath } from "../../app/utilities";


export function Landing() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [logout] = useLogoutMutation();
	const sessionKey = useSelector<RootState, string>(selectSessionKey);
	const sessionData = useReauthQuery(sessionKey, {
		skip: !sessionKey || sessionKey === '',
		pollingInterval: 5 * 60 * 1000 // 5min in ms
	});

	useEffect(() => {
		if (!sessionKey || sessionKey === '') {
			navigate('/');
		} else if (sessionData.isError) {
			dispatch(clearKey());
		}
	}, [
		sessionKey,
		sessionData
	]);

	useEnforceHomePath();

	async function handleLogout() {
		try {
			await logout(sessionKey).unwrap();
		} finally {
			dispatch(clearKey());
		}
	}

	return (
		<Box sx={{flexGrow: 1}}>
			<AppBar position='static' elevation={0}>
				<Toolbar>
					<LocalCafe
						fontSize='large'
						color='inherit'
						sx={{
							mr: theme => theme.spacing(2)
						}}
					/>
					<Typography variant='h6' component='div' sx={{flexGrow: 1}}>
						Cafeteria Gourmet
					</Typography>
					<IconButton
						color='inherit'
						edge='end'
						sx={{
							ml: theme => theme.spacing(2)
						}}
						onClick={handleLogout}
					>
						<Logout />
					</IconButton>
				</Toolbar>
			</AppBar>
			{sessionData.isSuccess &&
			<Container>
				<Typography variant='h6' sx={{pt: 2}}>
					Bem vindo(a), {sessionData.data.nome}!
				</Typography>
			</Container>
			}
			<Outlet />
		</Box>
	);
}
