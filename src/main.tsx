import { App } from '~/app/ui'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ReactQueryProvider } from './app/providers'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ReactQueryProvider>
			<App />
		</ReactQueryProvider>
	</StrictMode>,
)
