import React from 'react'
import { PropsWithChildren } from '~/shared/types'
import { useToast } from '~/shared/hooks'

// Define the shape of the user data
interface User {
	username: string
	password: string
}

// Define the shape of the context value
interface UserContextType {
	user: User | null
	login: (user: User) => void
	logout: () => void
}

// Create the context with an initial value of null
const UserContext = React.createContext<UserContextType | undefined>(undefined)

// Context Provider Component
export const UserProvider = ({ children }: PropsWithChildren) => {
	const [user, setUser] = React.useState<User | null>(null)

	const toast = useToast()

	// Function to log in a user
	const login = (user: User) => {
		setUser(user) // Сохраняем данные пользователя в localStorage
		localStorage.setItem('user', JSON.stringify(user))

		toast('Успех!')
	}

	// Function to log out the user
	const logout = () => {
		setUser(null)
		localStorage.removeItem('user')
	}

	React.useEffect(() => {
		const loggedUserString = localStorage.getItem('user')
		const loggedUser = loggedUserString && JSON.parse(loggedUserString)
		setUser(loggedUser)
	}, [])

	// Provide user state and actions to children
	return <UserContext.Provider value={{ user, login, logout }}>{children}</UserContext.Provider>
}

// Custom hook to access the UserContext
export const useUser = (): UserContextType => {
	const context = React.useContext(UserContext)
	if (!context) {
		throw new Error('useUser must be used within a UserProvider')
	}
	return context
}
