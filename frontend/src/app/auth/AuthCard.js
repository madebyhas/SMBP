const AuthCard = ({ logo, children }) => (
    <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-white">
        <div>{logo}</div>

        <div className="w-full max-w-sm mt-4 px-4 py-4 bg-green-100 shadow-md overflow-hidden rounded-lg sm:max-w-md sm:mt-6 sm:px-6 sm:py-4">
            {children}
        </div>


    </div>
)

export default AuthCard
