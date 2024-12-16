import { MainLayout } from '~/shared/ui'
import { AuthPage, MovieDetails, Movies } from '~/pages'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

export function RouterProvider() {
	return (
		<BrowserRouter basename="/aston-intensive-project">
			<Routes>
				<Route path="/" element={<MainLayout />}>
					<Route index path="/" element={<Movies />} />
					<Route path="/auth" element={<AuthPage />} />
					<Route path="/movie/:id" element={<MovieDetails />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}
