import { useEffect, useState } from 'react';
import axios from '@/lib/axios';


const useUser = formik => {

    //State user, loading, dan eror
    const [users, setUser] = useState([])
    const [loading, setLoading] = useState([false])
    const [error, setErorr] = useState(null)

    //useeffect untuk looping data
    useEffect(() => {
        ; (async () => {
            try {
                setLoading(true)
                const { data } = await axios.get("http://localhost:8000/api/users");
                setUser(data.data)
            } catch (error) {
                setErorr(error.message)
            } finally {
                setLoading(false)
            }
        })()
    }, [])

    //ambil data user untuk dikirmkan ke form input
    const getUser = async id => {
        try {
            const { data } = await axios.get(`http://localhost:8000/api/users/${id}`)

            const user = data.data

            formik.setFieldValue('name', user.name)
            formik.setFieldValue('email', user.email)
            formik.setFieldValue('id', user.id)

        } catch (error) {
            console.log(error);
        }
    }
    //handle untuk add user
    const handleAddUser = async values => {
        // konversi email ke lowercase dikirimkan ke API
        values.email = values.email.toLowerCase();
        // pennambahan password_confirmation
        values.password_confirmation = values.password;

        try {
            const { data } = await axios.post('http://localhost:8000/api/users', values);

            const user = data.data;

            setUser(prev => [...prev, user]);
        } catch (error) {
            console.error(error);
        }
    }

    // handle untuk update user
    const handleUpdateUsers = async values => {
        
        if (!values.password) {
            delete values.password;
        }

        try {
            const { data } = await axios.put(
                `http://localhost:8000/api/users/${values.id}`, 
                values
            );

            const user = data.data;

            const updatedUsers = users.map(item =>
                item.id === user.id ? user : item
            );
            setUser(updatedUsers);
        } catch (error) {
            console.log(error);
        }
    };

    //handle untuk delete user
    const handleDeleteUsers = async id => {
        const isYes = confirm('Anda Yakin Menghapus data ini?')
        if (isYes) {
            try {
                await axios.delete(`http://localhost:8000/api/users/${id}`)
                const filteredUsers = users.filter(item => item.id !== id)
                setUser(filteredUsers)

            } catch {
                console.log(error)
            }
        }
    }

    return {
        users,
        userloading: loading,
        userError: error,
        getUser,
        handleAddUser,
        handleUpdateUsers,
        handleDeleteUsers
    }
}


export default useUser