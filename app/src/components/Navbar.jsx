import { Link, useLocation } from 'react-router-dom'
import supabase from '../supabase-client'

export default function Navbar({ session }) {
  const { pathname } = useLocation()

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between">
      <Link to="/" className="font-semibold text-gray-800 text-sm tracking-wide">
        Celine Residences
      </Link>
      <div className="flex items-center gap-4 text-sm">
        <Link to="/" className={pathname === '/' ? 'text-rose-600 font-medium' : 'text-gray-500'}>
          Home
        </Link>
        <Link to="/book" className={pathname === '/book' ? 'text-rose-600 font-medium' : 'text-gray-500'}>
          Book
        </Link>
        <Link to="/faqs" className={pathname === '/faqs' ? 'text-rose-600 font-medium' : 'text-gray-500'}>
          FAQs
        </Link>
        {session && (
          <>
            <Link to="/admin" className="text-gray-500">
              Dashboard
            </Link>
            <button onClick={handleLogout} className="text-gray-400 text-xs">
              Sign out
            </button>
          </>
        )}
      </div>
    </nav>
  )
}