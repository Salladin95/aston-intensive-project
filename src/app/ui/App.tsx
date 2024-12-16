import { UserProvider } from '~/shared/context'
import { SnackbarProvider } from 'notistack'
import { ReactQueryProvider, RouterProvider } from '~/app/providers'

import './index.scss'

export function App() {
	return (
		<ReactQueryProvider>
			<SnackbarProvider maxSnack={6}>
				<UserProvider>
					<RouterProvider />
				</UserProvider>
			</SnackbarProvider>
		</ReactQueryProvider>
	)
}
