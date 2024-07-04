import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { AnnouncementProvider } from '#app/components/announcer'
import { Layout } from '#app/components/layout'
import { Home, handle as homeHandle } from '#app/routes/home'
import { NestedRoutes } from '#app/routes/nested-routes'
import {
	NestedRoutesCreate,
	handle as nestedRoutesCreateHandle,
	action as nestedRoutesCreateAction,
} from '#app/routes/nested-routes.create'
import {
	NestedRoutesIndex,
	handle as nestedRoutesIndexHandle,
	action as nestedRoutesIndexAction,
	loader as nestedRoutesIndexLoader,
} from '#app/routes/nested-routes.index'
import {
	NestedRoutesUpdate,
	loader as nestedRoutesUpdateLoader,
	action as nestedRoutesUpdateAction,
	handle as nestedRoutesUpdateHandle,
} from '#app/routes/nested-routes.update.$id'
import { action as messageAction } from '#app/utils/message.js'

const router = createBrowserRouter([
	{
		path: '/',
		Component: Layout,
		children: [
			{
				index: true,
				handle: homeHandle,
				Component: Home,
			},
			{
				path: 'message',
				action: messageAction,
			},
			{
				path: 'nested-routes',
				Component: NestedRoutes,
				children: [
					{
						index: true,
						handle: nestedRoutesIndexHandle,
						loader: nestedRoutesIndexLoader,
						action: nestedRoutesIndexAction,
						Component: NestedRoutesIndex,
					},
					{
						path: 'create',
						handle: nestedRoutesCreateHandle,
						action: nestedRoutesCreateAction,
						Component: NestedRoutesCreate,
					},
					{
						path: 'update/:id',
						handle: nestedRoutesUpdateHandle,
						loader: nestedRoutesUpdateLoader,
						action: nestedRoutesUpdateAction,
						Component: NestedRoutesUpdate,
					},
				],
			},
		],
	},
])

function App() {
	return (
		<AnnouncementProvider>
			<RouterProvider router={router} />
		</AnnouncementProvider>
	)
}

export default App
