"use client";

import Header from '@/app/(app)/Header'
import { useFormik } from 'formik';
import UserForm from '@/components/user/UsersForm';
import UserList from '@/components/user/listUser';
import useUser from '@/components/user/customHook';
import { userSchema } from '@/components/user/schema';
import { useAuth } from '@/hooks/auth';
import axios from '@/lib/axios';


const Users = () => {
    const { user } = useAuth(); // hook useAuth untuk mendapatkan data user

    //formik untuk set data handle ketika update/add
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
        validationSchema: userSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                if (values.id) {
                    handleUpdateUsers(values)
                } else {
                    handleAddUser(values)
                }
                resetForm()
            } catch (error) {
                console.log(error)
            }
        },
    })

    //ambil handle dari custom hook
    const {
        users,
        userloading: loading,
        userError: error,
        getUser,
        handleAddUser,
        handleUpdateUsers,
        handleDeleteUsers
    } = useUser(formik);

    return (
        <>
            {/* Title header dan meta  */}
            <Header title="Users" meta="Users" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white-50 border-b border-white-200">
                            {/* Cek apakah user adalah admin */}
                            {user?.role === 'admin' && (
                                <>
                                    {/* Menampilkan Form User */}
                                    <UserForm handleAddUser={handleAddUser} formik={formik} />

                                    {/* Menampilkan Table User */}
                                    <UserList users={users} getUser={getUser} handleDeleteUsers={handleDeleteUsers} />
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Users;
