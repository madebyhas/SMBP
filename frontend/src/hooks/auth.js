import useSWR from 'swr'
import axios from '@/lib/axios'
import { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'

export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
    const router = useRouter()
    const params = useParams()

    const { data: user, error, mutate } = useSWR('/api/user', () =>
        axios
            .get('/api/user')
            .then(res => res.data)
    )

    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const register = async ({ setErrors, ...props }) => {
        await csrf()

        setErrors([])

        axios
            .post('/auth/register', props)
            .then(() => mutate())
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const login = async ({ setErrors, setStatus, ...props }) => {
        // Lakukan permintaan CSRF untuk memastikan session valid
        await csrf()

        // Reset errors dan status sebelumnya
        setErrors([])
        setStatus(null)

        try {
            // Kirim request login ke backend
            const response = await axios.post('/auth/login', props)

            // Ambil token dari response data dan simpan di localStorage
            const { token, user } = response.data

            // Simpan token ke localStorage untuk autentikasi di permintaan selanjutnya
            localStorage.setItem('token', token)

            // Simpan informasi user (optional)
            localStorage.setItem('user', JSON.stringify(user))

            // Lakukan apa pun setelah login berhasil (seperti memanggil mutate atau redirect)
            mutate() // Fungsi mutate() untuk update state atau re-fetch data setelah login

        } catch (error) {
            if (error.response && error.response.status === 422) {
                // Jika terjadi error validasi (misalnya email/password salah), set error messages
                setErrors(error.response.data.errors)
            } else {
                // Jika error lain terjadi (misalnya server error), bisa menampilkan error global
                setStatus('Login Gagal. Coba Ulangi!.')
            }
        }
    }
    const resetPassword = async ({ setErrors, setStatus, ...props }) => {
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('/reset-password', { token: params.token, ...props })
            .then(response =>
                router.push('/login?reset=' + btoa(response.data.status)),
            )
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    // const logout = async () => {
    //     try {
    //         // Ambil token dari localStorage
    //         const token = localStorage.getItem('token');
            
    //         // Kirim permintaan logout ke backend jika token ditemukan
    //         if (token) {
    //             await axios.post('/auth/logout', null, {
    //                 headers: {
    //                     Authorization: `Bearer ${token}`,
    //                 },
    //             });
    //         }
    
    //         // Hapus token dan user data dari localStorage
    //         localStorage.removeItem('token');
    //         localStorage.removeItem('user');
    
    //         // Lakukan mutate (misalnya untuk update state atau re-fetch data)
    //         mutate();
    
    //         // Redirect ke halaman login setelah logout
    //         window.location.pathname = '/'; // Atau gunakan router.push('/login') jika menggunakan Next.js
    //     } catch (error) {
    //         console.error('Error saat logout:', error);
    
    //         // Tetap hapus token dan data user meskipun terjadi error
    //         localStorage.removeItem('token');
    //         localStorage.removeItem('user');
    //         mutate();
    
    //         // Redirect ke halaman login
    //         window.location.pathname = '/'; // Atau gunakan router.push('/login')
    //     }
    // };
    const logout = async () => {
        if (!error) {
            await axios.post('/auth/logout').then(() => mutate())
        }

        window.location.pathname = '/'
    }
    
    useEffect(() => {
        // Jika pengguna sudah login, arahkan ke halaman yang sesuai
        if (middleware === 'guest' && redirectIfAuthenticated && user)
            router.push(redirectIfAuthenticated)

        // Langsung bisa menuju halaman dashboard
        if (middleware === 'auth' && error) logout()

    }, [user, error])

    return {
        user,
        register,
        login,
        resetPassword,
        logout,
    }
}
