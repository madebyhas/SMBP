import * as Yup from 'yup';

//validasi form
export const bookSchema = Yup.object().shape({
  judul: Yup.string().required('Wajib Isi Form Ini !'),
  penulis: Yup.string().required('Wajib Isi Form Ini !'),
  tahun_terbit: Yup.date().required('Wajib Isi Form Ini !'),
  kategori: Yup.string().required('Wajib Isi Form Ini !'),
  status: Yup.string().required('Wajib Isi Form Ini !'),
  image: Yup.string().required('Wajib Isi Form Ini !'),
})