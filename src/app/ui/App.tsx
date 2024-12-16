import { ReactQueryProvider, RouterProvider } from '~/app/providers'

import './index.scss'

export function App() {
	return (
		<ReactQueryProvider>
			<RouterProvider />
		</ReactQueryProvider>
	)
}
