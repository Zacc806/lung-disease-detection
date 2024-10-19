import { lazy } from 'react'
import { MAIN_ROUTE, LOGIN_ROUTE, NOTFOUND_ROUTE } from './routes.consts'
import NotFound from '@/pages/404'
import Loading from '@/components/shared/Loader'

const Main = lazy(() => import('@/pages/Home'))
const Login = lazy(() => import('@/pages/login'))

// export const protectedRoutes = [
//     {
//         path: ADMIN_ROUTE,
//         Component: Admin,
//         Loader: Loading,
//     },
//     {
//         path: FINANCE_ROUTE,
//         Component: Finance,
//         Loader: Loading,
//     },
//     {
//         path: MAIN_ROUTE,
//         Component: Main,
//         Loader: Loading,
//     },
//     {
//         path: SALES_ROUTE,
//         Component: Sales,
//         Loader: Loading,
//     },
//     {
//         path: PRODUCTION_ROUTE,
//         Component: Production,
//         Loader: Loading,
//     },
// ]

export const publicRoutes = [
    {
        path: MAIN_ROUTE,
        Component: Main,
        Loader: Loading,
    },
    {
        path: LOGIN_ROUTE,
        Component: Login,
        Loader: Loading,
    },
    {
        path: NOTFOUND_ROUTE,
        Component: NotFound,
        Loader: Loading,
    },
]
