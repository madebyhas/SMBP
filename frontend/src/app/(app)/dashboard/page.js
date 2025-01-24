import Header from '@/app/(app)/Header'

const Dashboard = () => {
    return (
        <>
            <Header title="Dashboard" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-green-100 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            {/* Header Section */}
                            <div className="text-center">
                                <h1 className="text-3xl font-semibold text-gray-900">Selamat Datang di Sistem Manajemen Buku Perpustakaan</h1>
                            </div>

                            {/* Section with an Image */}
                            <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <h2 className="text-2xl font-semibold text-gray-900">Nikmati Pengalaman Baru Perpusatakaan</h2>
                                    <p className="text-gray-600">
                                        Jelajahi dunia literasi dengan cara yang lebih menyenangkan. Sistem perpustakaan kami dirancang untuk membuat pengelolaan koleksi buku Anda menjadi pengalaman yang tak terlupakan.
                                    </p>
                                    <ul className="space-y-4 text-gray-600">
                                        <li className="flex items-center">
                                            
                                            <span className="ml-2">1. Keamanan User</span>
                                        </li>
                                        <li className="flex items-center">
                                            
                                            <span className="ml-2">2. Buku-buku yang menarik</span>
                                        </li>
                                        
                                        <li className="flex items-center">
                                            
                                            <span className="ml-2">3. Sistem pinjaman yang friendly</span>
                                        </li>
                                        <li className="flex items-center">
                                            
                                            <span className="ml-2">4. Pencarian yang mudah</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* Image Section */}
                                <div className="flex justify-center">
                                    <img

                                        src="/image/book.svg"
                                        alt="Library management"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Dashboard