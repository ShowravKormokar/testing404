import { Outlet } from 'react-router-dom'

import Footer from './Footer'
import Navbar from './Navbar'

function PageLayout() {
  return (
    <div className="app-shell flex min-h-screen flex-col">
      <Navbar />
      <main className="page-container flex-1 py-6 sm:py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default PageLayout