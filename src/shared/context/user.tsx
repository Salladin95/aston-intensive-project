import React from 'react'
import { PropsWithChildren, User } from '~/shared/types'
import { useToast } from '~/shared/hooks'

interface UserContextType {
	user: User | null
	login: (user: User) => void
	logout: () => void
}

const UserContext = React.createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({ children }: PropsWithChildren) => {
	const [user, setUser] = React.useState<User | null>(null)

	const toast = useToast()

	const login = (user: User) => {
		setUser(user) // Сохраняем данные пользователя в localStorage
		localStorage.setItem('user', JSON.stringify(user))

		toast('Успех!')
	}

	const logout = () => {
		setUser(null)
		localStorage.removeItem('user')
	}

	React.useEffect(() => {
		const loggedUserString = localStorage.getItem('user')
		const loggedUser = loggedUserString && JSON.parse(loggedUserString)
		setUser(loggedUser)
	}, [])
	return <UserContext.Provider value={{ user, login, logout }}>{children}</UserContext.Provider>
}

export const useUser = (): UserContextType => {
	const context = React.useContext(UserContext)
	if (!context) {
		throw new Error('useUser must be used within a UserProvider')
	}
	return context
}
