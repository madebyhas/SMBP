// pages/dashboard/books.js

import React, { useState } from 'react';
import Proptypes from 'prop-types';

import FormControl from '@/components/formControl';
import Input from '@/components/input';
import Button from '@/components/button';

const UsersForm = ({ formik }) => {
    return (
        <div className="w-full mb-5">
            <form onSubmit={formik.handleSubmit}>
                {/* form name */}
                <FormControl label="Name" id="name">
                    <Input placeholder="Input Name User" id="name" name="name"
                        onChange={formik.handleChange} value={formik.values.name} />
                    {formik.errors && (<label className="text-red-600">{formik.errors['name']}</label>)}
                </FormControl>

                {/* form email */}
                <FormControl label="Email" id="email">
                    <Input placeholder="Input Email User" id="email" name="email" type="email"
                        onChange={formik.handleChange} value={formik.values.email} />
                    {formik.errors && (<label className="text-red-600">{formik.errors['email']}</label>)}
                </FormControl>
                
                {/* form password */}
                <FormControl label="Password" id="password">
                    <Input placeholder="Input Passwor User (Optional)" id="password" name="password" type="password"
                        onChange={formik.handleChange} value={formik.values.password} />
                    {formik.errors && (<label className="text-red-600">{formik.errors['password']}</label>)}
                </FormControl>

                {/* button submit */}
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
UsersForm.PropTypes = {}


export default UsersForm;
