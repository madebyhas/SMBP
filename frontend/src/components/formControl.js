import React from 'react';
import Proptypes from 'prop-types';

const FormControl = ({ children, label, id }) => {
    return (
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" for={id}>
                { label }
            </label>
            { children }
        </div>
    )

}

FormControl.PropTypes = {}


export default FormControl
