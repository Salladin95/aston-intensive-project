import { MainLayout, ProtectedRoutes } from '~/shared/ui'
import { AuthPage, HistoryPage, MovieDetails, Movies } from '~/pages'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

export function RouterProvider() {
	return (
		<BrowserRouter basename="/aston-intensive-project">
			<Routes>
				<Route path="/" element={<MainLayout />}>
					<Route index path="/" element={<Movies />} />
					<Route path="/auth" element={<AuthPage />} />
					<Route path="/movie/:id" element={<MovieDetails />} />
					<Route path="/protected" element={<ProtectedRoutes />}>
						<Route path="history" element={<HistoryPage />} />
						<Route path="favorites" element={<HistoryPage />} />
					</Route>
				</Route>
			</Routes>
		</BrowserRouter>
	)
}
