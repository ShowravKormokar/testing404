import { createHashRouter } from 'react-router-dom'

import PageLayout from '../components/layout/page-layout'
import Home from '../pages/Home/Home'
import Learn from '../pages/Learn/Learn'
import Movies from '../pages/Movies/Movies'
import NotFound from '../pages/NotFound/NotFound'

const router = createHashRouter([
  {
    element: <PageLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/learn', element: <Learn /> },
      { path: '/movies', element: <Movies /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])

export default router