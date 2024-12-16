import { QueryClient } from "@tanstack/react-query"

/**
 *  Focuses first input of event
 * */
export const focusFirstInput = (e: React.MouseEvent) => {
	const input = e.currentTarget.querySelector("input")
	input?.focus()
}

export function getQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: {
				// to avoid re-fetching immediately on the client
				// staleTime: 120 * 1000,
				staleTime: 0,
				retry: false,
				refetchOnMount: true,
			},
		},
	})
}
