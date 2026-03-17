import { createBrowserRouter } from 'react-router'
import { Home } from '../pages/home'
import { RedirectPage } from '../pages/redirect'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />,
	},

	{
		path: "/:shortLink",
		element: <RedirectPage />,
	},
])
