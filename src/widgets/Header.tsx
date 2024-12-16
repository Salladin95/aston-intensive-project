import { Link, useNavigate } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home'
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Stack } from '@mui/material'
import { useUser } from '~/shared/context'

export function Header() {
	const { user, logout } = useUser()
	const navigate = useNavigate()

	function handleLogOut() {
		logout()
		navigate('/')
	}

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
				{user ? (
					<Stack direction="row" spacing={2}>
						<Typography variant="h6" sx={{ textDecoration: 'none', color: 'inherit' }}>
							{user.username}
						</Typography>
						<Button component={Link} to="/favorites" color="inherit">
							Избранное
						</Button>
						<Button component={Link} to="/history" color="inherit">
							История поиска
						</Button>
						<Button color="inherit" onClick={handleLogOut}>
							Выйти
						</Button>
					</Stack>
				) : (
					<Stack direction="row" spacing={2}>
						<Button component={Link} to="/auth?signin" color="inherit">
							Вход
						</Button>
						<Button component={Link} to="/auth?signup" color="inherit">
							Регистрация
						</Button>
					</Stack>
				)}
			</Toolbar>
		</AppBar>
	)
}
