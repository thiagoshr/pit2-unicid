import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { UserTypes } from "./constants";
import { useReauthQuery } from "../features/login/loginEndpoints";
import { selectSessionKey } from "../features/login/sessionSlice";

export function useEnforceHomePath() : void {
	const sessionKey = useSelector(selectSessionKey);
	const userData = useReauthQuery(sessionKey);
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		if (userData.isSuccess) {
			if(userData.data.tipo == UserTypes.barista
				&& !location.pathname.startsWith('/app/barista'))
				navigate('/app/barista/');
			else if (userData.data.tipo == UserTypes.gerente
				&& !location.pathname.startsWith('/app/gerente'))
				navigate('/app/gerente/');
			else if (userData.data.tipo == UserTypes.op_caixa
				&& !location.pathname.startsWith('/app/caixa'))
				navigate('/app/caixa/');
			else if (userData.data.tipo == UserTypes.cliente
				&& !location.pathname.startsWith('/app/cliente'))
				navigate('/app/cliente/');
		}
	}, [
		userData.isSuccess,
		userData.data?.tipo,
		location.pathname
	]);
}
