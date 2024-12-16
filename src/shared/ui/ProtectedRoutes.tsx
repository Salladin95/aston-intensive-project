import { Outlet, useNavigate } from 'react-router-dom'

export function ProtectedRoutes() {
	const loggedUserString = localStorage.getItem('user')
	const navigate = useNavigate()

	if (!loggedUserString) {
		navigate('/auth?signin', { replace: true })
	}

	return <Outlet />
}
