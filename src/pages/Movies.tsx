import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSearchMoviesByTitle } from '~/shared/api/movies'
import { Typography, Box, CardMedia, Card, CardContent, Container, TextField, IconButton, Button } from '@mui/material'
import { E404 } from '~/shared/ui/E404'
import { Loader } from '~/shared/ui'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'

export function Movies() {
	const [movieQuery, setMovieQuery] = React.useState('Lord')
	const deferredMovieQuery = React.useDeferredValue(movieQuery)
	const { data: movies, error, isPending } = useSearchMoviesByTitle(deferredMovieQuery)
	const navigate = useNavigate()

	return (
		<Container component={'main'} sx={{ padding: '2rem' }}>
			<TextField
				sx={{ mb: '1rem' }}
				label="Search for movies"
				variant="outlined"
				value={movieQuery}
				onChange={(e) => setMovieQuery(e.target.value)}
				fullWidth
			/>
			{(() => {
				switch (true) {
					case isPending:
						return <Loader />
					case !movies || movies.length === 0 || error:
						return <E404 />
					default:
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
											sx={{
												position: 'absolute',
												top: 16,
												right: 0,
												color: 'red',
												opacity: 0,
												transition: 'opacity 0.3s ease',
											}}
											onClick={() => {
												console.log('Added to favorites')
											}}
										>
											{true ? <FavoriteBorderIcon /> : <FavoriteIcon />}
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
			})()}
		</Container>
	)
}
