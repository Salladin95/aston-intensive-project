import { Link } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Stack } from '@mui/material'

export function Header() {
	const logged = false

	return (
		<AppBar position="static" color="primary">
			<Toolbar>
				{/* Logo and Title */}
				<Box display="flex" alignItems="center" flexGrow={1}>
					<IconButton edge="start" color="inherit" component={Link} to="/">
						<HomeIcon />
					</IconButton>
					<Typography variant="h6" component={Link} to="/" sx={{ textDecoration: 'none', color: 'inherit', ml: 1 }}>
						Movies
					</Typography>
				</Box>

				{/* Navigation Links */}
				{logged ? (
					<Stack direction="row" spacing={2}>
						<Button component={Link} to="/favorites" color="inherit">
							Избранное
						</Button>
						<Button component={Link} to="/history" color="inherit">
							История поиска
						</Button>
						<Button
							onClick={() => {
								console.log('SIGN OUT')
							}}
							component={Link}
							to="/signin"
							color="inherit"
						>
							Выйти
						</Button>
					</Stack>
				) : (
					<Stack direction="row" spacing={2}>
						<Button component={Link} to="/signin" color="inherit">
							Вход
						</Button>
						<Button component={Link} to="/signup" color="inherit">
							Регистрация
						</Button>
					</Stack>
				)}
			</Toolbar>
		</AppBar>
	)
}
