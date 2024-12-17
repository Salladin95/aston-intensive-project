import React from 'react'
import { E404 } from '~/shared/ui/E404'
import { Loader } from '~/shared/ui'
import { MoviesView } from '~/widgets/MoviesView'
import { Container, TextField } from '@mui/material'
import { useSearchMoviesByTitle } from '~/shared/api'
import { useLocation } from 'react-router-dom'

export function Movies() {
	const location = useLocation()
	const searchParam = new URLSearchParams(location.search).get('query')
	const [movieQuery, setMovieQuery] = React.useState(searchParam?.split('=')[1] || 'Lord of the Rings')
	const deferredMovieQuery = React.useDeferredValue(movieQuery)
	const { data: movies, error, isPending } = useSearchMoviesByTitle(deferredMovieQuery)

	function handleOnChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		const value = e.currentTarget.value
		setMovieQuery(value)
		window.history.pushState(null, '', `/?query=${value}`)
	}

	return (
		<Container component={'main'} sx={{ padding: '2rem' }}>
			<TextField
				sx={{ mb: '1rem' }}
				label="Search for movies"
				variant="outlined"
				value={movieQuery}
				onChange={handleOnChange}
				fullWidth
			/>
			{(() => {
				switch (true) {
					case isPending:
						return <Loader />
					case !movies || movies.length === 0 || error:
						return <E404 />
					default:
						return <MoviesView movies={movies} />
				}
			})()}
		</Container>
	)
}
