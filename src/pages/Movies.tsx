import { useNavigate } from 'react-router-dom'
import { useSearchMoviesByTitle } from '~/shared/api/movies'
import { Typography, Box, CardMedia, Card, CardContent, Container } from '@mui/material'

export function Movies() {
	const { data: movies } = useSearchMoviesByTitle('Lord of the rings')
	const navigate = useNavigate()

	if (!movies || movies.length === 0) {
		return (
			<Box display="flex" justifyContent="center" alignItems="center" height="100vh">
				<Typography variant="h6">No movies found.</Typography>
			</Box>
		)
	}

	return (
		<Container component={'main'} sx={{ padding: '1rem' }}>
			<Box
				display="grid"
				gap={2}
				sx={{
					'@media (min-width: 600px)': {
						gridTemplateColumns: 'repeat(2, 1fr)',
					},
					'@media (min-width: 1024px)': {
						gridTemplateColumns: 'repeat(3, 1fr)',
					},
				}}
			>
				{movies.map((movie) => (
					<Card
						key={movie.imdbID}
						sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center', maxWidth: 500 }}
						onClick={() => navigate(`/movie/${movie.imdbID}`)}
					>
						<CardMedia
							component="img"
							alt={movie.Title}
							image={movie.Poster}
							sx={{ width: 80, height: 120, objectFit: 'cover' }}
						/>
						<CardContent>
							<Typography variant="h6" component="div">
								{movie.Title}
							</Typography>
							<Typography variant="body2" color="text.secondary">
								{movie.Year}
							</Typography>
							<Typography variant="body2" color="text.secondary">
								{movie.Type}
							</Typography>
						</CardContent>
					</Card>
				))}
			</Box>
		</Container>
	)
}
