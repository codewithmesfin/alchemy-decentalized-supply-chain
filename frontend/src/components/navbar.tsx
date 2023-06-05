

export default function Navbar() {
    return (
        <>
            <div className="fixed bg-white w-full border-b p-5 z-50">
                <div className="md:max-w-7xl mx-auto">
                    <div className="flex justify-between items-center space-x-5 md:space-x-10">
                        <div className="flex space-x-2 md:space-x-3 items-center font-extrabold">
                          <img src="/logo.png" alt="" 
                          className="rounded-full object-cover h-12 w-12"
                          />
                            <span className="text-2xl md:text-4xl text-blue-600">Supply Chain </span>
                        </div>
                        <div className="flex space-x-5">
                            <a href="https://linkedin.com/in/mesfin-tsegaye" className="text-blue-600 font-semibold">Linkedin</a>
                            <a href="https://github.com/sciemesfin" className="text-blue-600 font-semibold">GitHub</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
