const Loading = ({ message }) => {
    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-gray-100">
            <div className="flex items-center space-x-2">
                {/* Spinner atau animasi loading */}
                <div className="animate-spin rounded-full border-4 border-t-4 border-gray-200 w-10 h-10"></div>
                <p className="text-xl text-gray-700">{message}</p>
            </div>
        </div>
    )
}

export default Loading
