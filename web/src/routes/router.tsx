import { createBrowserRouter } from 'react-router'
import { Home } from '../pages/home'
import { RedirectPage } from '../pages/redirect'
import { NotFoundPage } from '../pages/not-found'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />,
	},

	{
		path: "/not-found",
		element: <NotFoundPage />,
	},

	{
		path: "/:shortLink",
		element: <RedirectPage />,
	},
])
