import LoginLinks from '@/app/LoginLinks'

export const metadata = {
    title: 'SMBP | HOME',
}


const Home = () => {
    return (
        <>
            <div className="relative flex items-top justify-center min-h-screen bg-white-100 dark:bg-white-900 sm:items-center sm:pt-0">
                <div className="relative isolate px-3 pt-7 lg:px-4">
                    <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
                        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-green-400 to-green-600 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>

                    </div>
                    <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:py-28">
                        <div className="text-center">
                            <h1 className="text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">Sistem Manajemen Buku Perpustakaan</h1>
                            <p className="mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
                                Selamat datang di sistem manajemen buku modern kami. Nikmati pengalaman perpustakaan yang lebih baik pada perpustakaan kami. </p>
                            <div className="mt-10 flex items-center justify-center gap-x-6">
                                <a href="/auth/login"
                                    className="rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                                    LOGIN
                                </a>
                                <a href="/auth/register" className="text-sm/6 font-semibold text-gray-900">REGISTER  <span aria-hidden="true">→</span></a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Home
