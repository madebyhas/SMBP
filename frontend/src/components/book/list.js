import React, { useState } from "react"
import PropTypes from "prop-types"
import DataTable from "react-data-table-component"
import Button from "@/components/button"

const ListBook = ({ books = [], getBook, handleDeleteBooks }) => {
  const [searchText, setSearchText] = useState("")

  // // Filter books berdasarkan search inputan
  const filteredBooks = books.filter((book) => {
    return (
      book.judul.toLowerCase().includes(searchText.toLowerCase()) ||
      book.penulis.toLowerCase().includes(searchText.toLowerCase()) ||
      book.kategori.toLowerCase().includes(searchText.toLowerCase())
    )
  })

  // DataTable
  const columns = [
    {
      name: "No",
      selector: (row, index) => index + 1, // menampilkan index as kolom numbe
      sortable: true,
      width: "80px",
    },
    {
      name: "Judul",
      selector: (row) => row.judul, // menampilkan data judul
      sortable: true,
    },
    {
      name: "Penulis",
      selector: (row) => row.penulis, // menampilkan data penulis
      sortable: true,
    },
    {
      name: "Kategori",
      selector: (row) => row.kategori, // menampilkan data kategori
      sortable: true,
    },
    {
      name: "Tahun Terbit",
      selector: (row) => row.tahun_terbit, // menampilkan data tahun
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex space-x-2">
          {/* button delete dan iconnya */}
          <Button
            className="mr-2"
            onClick={() => handleDeleteBooks(row.id)}
            style={{ backgroundColor: 'red' }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-trash"
              viewBox="0 0 16 16"
            >
              <path d="M5.5 5.5A.5.5 0 0 1 6 5h4a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5H6a.5.5 0 0 1-.5-.5v-8zM11 4a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h6zm-6.5-.5a.5.5 0 0 1 .5-.5H11a.5.5 0 0 1 .5.5V4H3v-.5a.5.5 0 0 1 .5-.5zM14.5 3a.5.5 0 0 1-.5-.5V2H10.5v1h4zm-9 0V2H1.5v.5A.5.5 0 0 1 1 3h4.5z" />
            </svg>
          </Button>

          {/* button edit dan iconnya */}
          <Button className="mr-2" onClick={() => getBook(row.id)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-pencil-square"
              viewBox="0 0 16 16"
            >
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706l-1.837 1.837-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zM1 13.5V16h2.5l7.145-7.145-2-2L1 13.5z" />
              <path fillRule="evenodd" d="M1 13.5V16h2.5l7.145-7.145-2-2L1 13.5zm12.02-8.18l-7.145 7.145-1.415-1.415L11.608 4z" />
            </svg>
          </Button>
        </div>
      ),
    },
  ]

  // Custom untuk styling table
  const customStyles = {
    headCells: {
      style: {
        backgroundColor: "#f3f4f6",
        color: "#333",
        fontWeight: "bold",
        fontSize: "16px",
      },
    },
    cells: {
      style: {
        paddingLeft: "10px",
        paddingRight: "10px",
        fontSize: "14px",
      },
    },
  }

  return (
    <div className="overflow-x-auto shadow-lg sm:rounded-lg">
      <DataTable
        title="Tabel Buku"
        columns={columns}
        data={filteredBooks}// gunakan fitur filter buku
        pagination // gunakan fitur pagination
        responsive // gunakan responsif table
        customStyles={customStyles} // gunakan custom styles
        subHeader // gunakan subheader 
        subHeaderComponent={
          <div className="flex items-center space-x-2">
            <label className="text-sm text-dark-700">Search :</label>
            <input
              type="text"
              placeholder="Search..."
              className="block p-2 w-full sm:w-80 text-sm border border-green-300 rounded-lg bg-white-50 focus:ring-green-500 focus:border-green-500 dark:bg-white-700 dark:border-gray-600 dark:text-white"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        }
      />
    </div>
  )
}

ListBook.propTypes = {
  books: PropTypes.array.isRequired,
  getBook: PropTypes.func.isRequired,
  handleDeleteBooks: PropTypes.func.isRequired,
}

export default ListBook

