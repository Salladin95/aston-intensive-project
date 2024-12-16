import { MovieDetails, Movies } from '~/pages'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MainLayout } from '~/shared/ui'

export function RouterProvider() {
	return (
		<BrowserRouter basename="/aston-intensive-project">
			<Routes>
				{/* <Route path="/signin" element={<Signin />} /> */}
				{/* <Route path="/signup" element={<Signup />} /> */}
				<Route path="/" element={<MainLayout />}>
					<Route index path="/" element={<Movies />} />
					<Route path="/movie/:id" element={<MovieDetails />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}
