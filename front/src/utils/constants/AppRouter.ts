import { lazy } from 'react'
import { MAIN_ROUTE, NOTFOUND_ROUTE, RESULT_ROUTE } from './routes.consts'
import NotFound from '@/pages/404'
import Loading from '@/components/shared/Loader'

const Main = lazy(() => import('@/pages/Home'))
const Result = lazy(() => import('@/pages/Result'))

export const publicRoutes = [
    {
        path: MAIN_ROUTE,
        Component: Main,
        Loader: Loading,
    },
    {
        path: RESULT_ROUTE,
        Component: Result,
        Loader: Loading,
    },
    {
        path: NOTFOUND_ROUTE,
        Component: NotFound,
        Loader: Loading,
    },
]
