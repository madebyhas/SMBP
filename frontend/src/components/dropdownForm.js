import React from 'react';
import Proptypes from 'prop-types';

const Dropdown = ({ placeholder, id, name, value, ...props }) => {
    return (
        <select
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            id={id}
            name={name}
            value={value} // kontrol nilai yang dipilih
            placeholder={placeholder}
            {...props}
        >
            <option disabled value="">
                Pilih Status
            </option>
            <option value="tersedia">Tersedia</option>
            <option value="dipinjam">Dipinjam</option>
        </select>
    )

}

Dropdown.PropTypes = {}


export default Dropdown
