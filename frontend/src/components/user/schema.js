import * as Yup from 'yup';

//validasi form
export const userSchema = Yup.object().shape({
  name: Yup.string().required('Wajib Isi Form Ini !'),
  email: Yup.string().required('Wajib Isi Form Ini !'),
  // password: Yup.string().required('Wajib Isi Form Ini !'),
})