import React from 'react';
import Proptypes from 'prop-types';

const Input = ( props ) => {
    return (<input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type='text'
        {...props} />
    )

}

Input.PropTypes = {}


export default Input
