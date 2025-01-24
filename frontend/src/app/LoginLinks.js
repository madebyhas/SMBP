'use client'

import Link from 'next/link'
import { useAuth } from '@/hooks/auth'

const LoginLinks = () => {
    const { user } = useAuth({ middleware: 'guest' })

    return (
        // <a href="#" className="text-sm/6 font-semibold text-gray-900">Learn more <span aria-hidden="true">→</span></a>
        <div className="hidden fixed top-0 right-0 px-6 py-4 sm:block">
            {user ? (
                <Link
                    href="/dashboard"
                    className="text-sm/6 font-semibold text-gray-900"
                >
                    Dashboard
                </Link>
            ) : (
                <>
                    <button
                        onClick={() => (window.location.href = '/login')}
                        className="text-sm/6 font-semibold text-gray-900"
                    >
                        Login
                    </button>
                    <button
                        onClick={() => (window.location.href = '/register')}
                        className="ml-4 text-sm/6 font-semibold text-gray-900"
                    >
                        Register
                    </button>
                </>
            )}
        </div>
    )
}

export default LoginLinks
