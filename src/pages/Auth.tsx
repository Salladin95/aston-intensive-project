import React from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { Box, TextField, Button, Typography, Container } from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup'
import { useLocation, useNavigate } from 'react-router-dom'
import { useToast } from '~/shared/hooks'
import { useUser } from '~/shared/context'

const schema = Yup.object().shape({
	username: Yup.string().required('Логин обязателен').min(1),
	password: Yup.string().required('Пароль обязателен').min(6, 'Пароль должен содержать минимум 6 символов'),
})

type FormData = Yup.InferType<typeof schema>

export const AuthPage = () => {
	const location = useLocation()
	const [isSignIn, setIsSignIn] = React.useState(location.search === '?signin')
	const { login } = useUser()
	const navigate = useNavigate()

	const toast = useToast()

	React.useEffect(() => {
		setIsSignIn(location.search === '?signin')
	}, [location])

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	})

	// Функция для регистрации
	const handleRegister = (user: FormData) => {
		// Check if the username already exists in localStorage during registration
		if (localStorage.getItem(user.username)) {
			return toast('Такой пользователь уже зарегистрирован', 'error')
		}

		// Сохраняем данные пользователя в localStorage
		localStorage.setItem(user.username, JSON.stringify(user.password))

		// Сохраняем пустую историю и избранное
		localStorage.setItem(`${user.username}_favorites`, JSON.stringify([]))
		localStorage.setItem(`${user.username}_history`, JSON.stringify([]))

		login(user)
		navigate('/')
	}

	// Функция для авторизации
	const handleLogin = (user: FormData) => {
		const savedPassword = JSON.parse(localStorage.getItem(user.username) ?? '')
		if (!savedPassword || user.password !== savedPassword) {
			return toast('Логин или пароль не верен', 'error')
		}

		login(user)
		navigate('/')
	}

	// Выбираем соответствующую функцию для отправки формы в зависимости от состояния (регистрация или авторизация)
	const onSubmit = isSignIn ? handleLogin : handleRegister

	return (
		<Container maxWidth="xs">
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					mt: 4,
				}}
			>
				<Typography variant="h5">{isSignIn ? 'Вход' : 'Регистрация'}</Typography>
				<form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%', marginTop: 20 }}>
					<TextField
						{...register('username')}
						label="Логин"
						variant="outlined"
						fullWidth
						error={!!errors.username}
						helperText={errors.username?.message}
						sx={{ mb: 2 }}
					/>
					<TextField
						{...register('password')}
						label="Пароль"
						variant="outlined"
						type="password"
						fullWidth
						error={!!errors.password}
						helperText={errors.password?.message}
						sx={{ mb: 2 }}
					/>
					<Button type="submit" variant="contained" fullWidth>
						{isSignIn ? 'Войти' : 'Зарегистрироваться'}
					</Button>
				</form>

				{/* Переключатель между формой входа и регистрации */}
				<Button onClick={() => setIsSignIn(!isSignIn)} sx={{ mt: 2 }} fullWidth>
					{isSignIn ? 'Нет аккаунта? Зарегистрируйтесь!' : 'Уже есть аккаунт? Войти!'}
				</Button>
			</Box>
		</Container>
	)
}
