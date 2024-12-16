import { useParams } from 'react-router-dom'
import { useSearchMovieById } from '~/shared/api/movies'
import { Box, Card, CardContent, CardMedia, Divider, Typography } from '@mui/material'

export function MovieDetails() {
	const { id } = useParams()
	const { data: movie } = useSearchMovieById(id || '', { enabled: Boolean(id) })
	if (!movie) return null

	return (
		<Box
			sx={{
				padding: 2,
				width: '100%',
				height: '94vh',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<Card sx={{ maxWidth: 1200 }}>
				<CardMedia
					component="img"
					alt={movie.Title}
					image={movie.Poster}
					sx={{ margin: '0 auto', mb: '4rem', width: 300, height: 450, objectFit: 'cover' }}
				/>
				<CardContent sx={{ paddingLeft: 2 }}>
					<Typography variant="h4">{movie.Title}</Typography>
					<Typography variant="body1" color="text.secondary">
						{movie.Year}
					</Typography>
					<Divider sx={{ my: 2 }} />
					<Typography variant="h6">Details:</Typography>
					<Box
						display="grid"
						gridTemplateColumns="repeat(2, 1fr)" // Two equal-width columns
						gap={2} // Spacing between items
						sx={{ marginTop: 1 }}
					>
						<Typography variant="body2">
							<strong>Genre:</strong> {movie.Genre}
						</Typography>
						<Typography variant="body2">
							<strong>Rated:</strong> {movie.Rated}
						</Typography>
						<Typography variant="body2">
							<strong>Released:</strong> {movie.Released}
						</Typography>
						<Typography variant="body2">
							<strong>Runtime:</strong> {movie.Runtime}
						</Typography>
						<Typography variant="body2">
							<strong>Director:</strong> {movie.Director}
						</Typography>
						<Typography variant="body2">
							<strong>Actors:</strong> {movie.Actors}
						</Typography>
					</Box>

					<Divider sx={{ my: 2 }} />

					<Typography variant="h6">Plot:</Typography>
					<Typography variant="body1" paragraph>
						{movie.Plot}
					</Typography>

					<Typography variant="body2">
						<strong>Awards:</strong> {movie.Awards}
					</Typography>
					<Typography variant="body2">
						<strong>IMDB Rating:</strong> {movie.imdbRating} ({movie.imdbVotes} votes)
					</Typography>
				</CardContent>
			</Card>
		</Box>
	)
}
