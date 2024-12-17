import { User } from '~/shared/types'
import { useCallback } from 'react'

export const useLocalStorageUser = () => {
	const addUser = useCallback((user: User) => {
		localStorage.setItem(user.username, JSON.stringify({ password: user.password }))
	}, [])

	const getUser = useCallback((username: string) => {
		const userString = localStorage.getItem(username)
		return userString ? JSON.parse(userString) : null
	}, [])

	return {
		addUser,
		getUser,
	}
}
