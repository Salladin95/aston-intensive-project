import { Movie } from '~/shared/types'
import { useUser } from '~/shared/context'
import { useFavorites } from '~/shared/hooks'
import { useNavigate } from 'react-router-dom'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { Typography, Box, CardMedia, Card, CardContent, IconButton, Button } from '@mui/material'

type MoviesViewProps = {
	movies: Movie[]
}

export function MoviesView(props: MoviesViewProps) {
	const { movies } = props
	const { user } = useUser()
	const navigate = useNavigate()
	const { toggleFavorite, isFavorite } = useFavorites(user?.username)
	return (
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
					sx={{
						position: 'relative',
						cursor: 'pointer',
						px: 2,
						pb: '2.5rem',
						'&:hover': {
							'& .controls': {
								opacity: 1, // Show the button on hover
							},
						},
					}}
				>
					<IconButton
						className="controls"
						onClick={() => toggleFavorite?.(movie)}
						sx={{
							display: user ? 'block' : 'none',
							position: 'absolute',
							top: 16,
							right: 0,
							color: 'red',
							opacity: 0,
							transition: 'opacity 0.3s ease',
						}}
					>
						{isFavorite(movie) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
					</IconButton>
					<CardContent sx={{ display: 'flex', gap: '1rem' }}>
						<CardMedia
							component="img"
							alt={movie.Title}
							image={movie.Poster}
							sx={{ width: 100, height: 120, objectFit: 'cover' }}
						/>
						<Box>
							<Typography variant="h6" component="div">
								{movie.Title}
							</Typography>
							<Typography variant="body2" color="text.secondary">
								{movie.Year}
							</Typography>
							<Typography variant="body2" color="text.secondary">
								{movie.Type}
							</Typography>
						</Box>
					</CardContent>
					<Button
						className="controls"
						onClick={() => navigate(`/movie/${movie.imdbID}`)}
						sx={{
							position: 'absolute',
							bottom: '4px',
							left: '50%',
							transform: 'translateX(-50%)',
							opacity: 0,
							transition: 'opacity 0.3s ease',
						}}
					>
						Подробнее
					</Button>
				</Card>
			))}
		</Box>
	)
}
