import { E404 } from '~/shared/ui/E404'
import { Container } from '@mui/material'
import { useUser } from '~/shared/context'
import { useFavorites } from '~/shared/hooks'
import { MoviesView } from '~/widgets/MoviesView'

export function FavoriteMovies() {
	const { user } = useUser()
	const { favorites: movies } = useFavorites(user?.username)
	return (
		<Container component={'main'} sx={{ padding: '2rem' }}>
			{(() => {
				switch (true) {
					case !movies || movies.length === 0:
						return <E404 />
					default:
						return <MoviesView movies={movies} />
				}
			})()}
		</Container>
	)
}
