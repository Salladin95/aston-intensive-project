import { Outlet } from 'react-router-dom'
import { Header } from '~/widgets'

export function MainLayout() {
	return (
		<>
			<Header />
			<Outlet />
		</>
	)
}
