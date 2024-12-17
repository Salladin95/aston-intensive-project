import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '~/shared/context'
import { Box, Typography, List, ListItem, ListItemText, Paper, Button } from '@mui/material'

export function HistoryPage() {
	const { user } = useUser()
	const navigate = useNavigate()
	const [history, setHistory] = React.useState<{ query: string; filters?: Record<string, string>; date: string }[]>([])

	// Загрузка истории из localStorage
	React.useEffect(() => {
		if (!user) return
		const key = `${user.username}_history`
		const storedHistory = JSON.parse(localStorage.getItem(key) || '[]')
		setHistory(storedHistory)
	}, [user])

	const handleRestoreSearch = (query: string, filters?: Record<string, string>) => {
		const searchParams = new URLSearchParams({ query })

		// Добавляем фильтры, если они есть
		if (filters) {
			Object.entries(filters).forEach(([key, value]) => {
				searchParams.append(key, value)
			})
		}

		// Перенаправляем на страницу поиска с параметрами
		navigate(`/?${searchParams.toString()}`, { replace: true })
	}

	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				padding: '1rem',
			}}
		>
			<Paper
				elevation={3}
				sx={{
					maxWidth: 600,
					width: '100%',
					padding: 3,
					textAlign: 'center',
				}}
			>
				<Typography variant="h4" component="h2" gutterBottom>
					История поиска
				</Typography>

				{history.length === 0 ? (
					<Typography variant="body1" color="textSecondary">
						История пуста.
					</Typography>
				) : (
					<List>
						{history.map((entry, index) => (
							<ListItem key={index} divider>
								<ListItemText
									primary={entry.query}
									secondary={`Поиск выполнен: ${new Date(entry.date).toLocaleString()}`}
								/>
								<Button
									variant="contained"
									size="small"
									onClick={() => handleRestoreSearch(entry.query, entry.filters)}
									sx={{ marginLeft: '1rem' }}
								>
									Восстановить
								</Button>
							</ListItem>
						))}
					</List>
				)}
			</Paper>
		</Box>
	)
}
