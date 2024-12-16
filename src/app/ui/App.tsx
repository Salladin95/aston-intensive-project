import React from 'react'
import { Box, CircularProgress } from '@mui/material'
import { ReactQueryProvider, RouterProvider } from '~/app/providers'

import './index.scss'

export function App() {
	return (
		<ReactQueryProvider>
			<React.Suspense
				fallback={
					<Box display="flex" justifyContent="center" alignItems="center" height="100vh">
						<CircularProgress />
					</Box>
				}
			>
				<RouterProvider />
			</React.Suspense>
		</ReactQueryProvider>
	)
}
