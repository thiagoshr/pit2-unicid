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
	IconButton
} from '@mui/material';

import {
	LocalCafe,
	Logout
} from '@mui/icons-material';
import { UserTypes } from "../../app/constants";



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

	useEffect(() => {
		if(sessionData?.data?.tipo) {
			switch (sessionData.data.tipo) {
				case UserTypes.barista:
					navigate('barista/');
					break;
				case UserTypes.gerente:
					navigate('gerente/');
					break;
				case UserTypes.op_caixa:
					navigate('caixa/');
					break;
				case UserTypes.cliente:
					navigate('cliente/');
					break;
			}
		}
	}, [sessionData?.data?.tipo]);

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
			<Outlet />
		</Box>
	);
}
