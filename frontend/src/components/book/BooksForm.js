// pages/dashboard/books.js

import React, { useState } from 'react';
import Proptypes from 'prop-types';

import FormControl from '@/components/formControl';
import Input from '@/components/input';
import Button from '@/components/button';
import Dropdown from '@/components/dropdownForm';


const BooksForm = ({ formik }) => {
    return (
        <div className="w-full mb-5">
            {/* form judul */}
            <form onSubmit={formik.handleSubmit}>
                <FormControl label="Judul" id="judul">
                    <Input placeholder="Input Judul Buku" id="judul" name="judul"
                        onChange={formik.handleChange} value={formik.values.judul} />
                    {formik.errors && (<label className="text-red-600">{formik.errors['judul']}</label>)}
                </FormControl>

                {/* form penulis */}
                <FormControl label="Penulis" id="penulis">
                    <Input placeholder="Input Penulis Buku" id="penulis" name="penulis"
                        onChange={formik.handleChange} value={formik.values.penulis} />
                    {formik.errors && (<label className="text-red-600">{formik.errors['penulis']}</label>)}
                </FormControl>
                
                {/* form tahun */}
                <FormControl label="Tahun Terbit" id="tahun_terbit">
                    <Input placeholder="Input Tahun Terbit Buku" id="tahun_terbit" type="year" name="tahun_terbit" min="1900" max="2099" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        onChange={formik.handleChange} value={formik.values.tahun_terbit} />
                    {formik.errors && (<label className="text-red-600">{formik.errors['tahun_terbit']}</label>)}
                </FormControl>
                
                {/* form kategori */}
                <FormControl label="Kategori" id="kategori">
                    <Input placeholder="Input Kategori Buku" id="kategori" name="kategori"
                        onChange={formik.handleChange} value={formik.values.kategori} />
                    {formik.errors && (<label className="text-red-600">{formik.errors['kategori']}</label>)}
                </FormControl>
                
                {/* form status */}
                <FormControl label="Status" id="status">
                    <Dropdown
                        id="status" name="status" placeholder="Pilih Status" onChange={formik.handleChange} value={formik.values.status} />
                    {formik.errors && (<label className="text-red-600">{formik.errors['status']}</label>)}
                </FormControl>

                {/* form Image File */}
                <FormControl label="Upload Cover Buku" id="image">
                    <Input placeholder="Upload Cover Buku" id="image" name="image" type="file" 
                        onChange={(event) => {
                            formik.setFieldValue("image", event.target.files[0]); // Set file ke Formik
                        }}/>
                    
                    {formik.errors && (<label className="text-red-600">{formik.errors['image']}</label>)}
                </FormControl>
                
                {/* Button Update dan Submit */}
                <Button type="submit"
                    disabled={!(formik.isValid && formik.dirty)}>
                    {formik.values.id ? 'Update' : 'Submit'}
                </Button>
            </form>

            {/* debug */}
            {/* <pre>
                {JSON.stringify(form, null, 2)}
            </pre> */}
        </div>
    )

}
BooksForm.PropTypes = {}


export default BooksForm;
