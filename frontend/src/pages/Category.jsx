import { Link } from "react-router-dom"

function Category() {
    return (
        <div className="min-h-screen bg-gray-100 p-8">

            {/* Heading */}
            <div className="max-w-6xl mx-auto">

                <h1 className="text-4xl font-bold text-gray-800 mb-3">
                    Puja Products
                </h1>

                <p className="text-gray-500 mb-10">
                    Select a product to calculate its production cost.
                </p>


                {/* Product Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Agarbatti */}
                    <Link
                        to="/product/agarbatti"
                        className="bg-white rounded-xl shadow-md p-8
                                   hover:shadow-xl transition cursor-pointer
                                   block"
                    >

                        <div className="text-5xl mb-5">
                            🪔
                        </div>

                        <h3 className="text-2xl font-semibold text-gray-800">
                            Agarbatti
                        </h3>

                        <p className="text-gray-500 mt-3">
                            Calculate the cost of making Agarbatti.
                        </p>

                        <div className="mt-6 text-blue-600 font-semibold">
                            Calculate Cost →
                        </div>

                    </Link>

                </div>

            </div>

        </div>
    )
}

export default Category