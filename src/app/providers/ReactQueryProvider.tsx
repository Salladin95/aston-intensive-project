import React from 'react'
import { getQueryClient } from '~/shared/utils'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { PropsWithChildren } from '~/shared/types'

export function ReactQueryProvider({ children }: PropsWithChildren) {
	const [queryClient] = React.useState(() => getQueryClient())
	return (
		<QueryClientProvider client={queryClient}>
			{children}
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	)
}
