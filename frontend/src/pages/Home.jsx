import { Link } from "react-router-dom"
function Home() {
    return (
        <div className="min-h-screen bg-gray-100">

            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-6xl mx-auto px-6 py-5">

                    <h1 className="text-2xl font-bold text-gray-800">
                        Production Cost Calculator
                    </h1>

                </div>
            </header>


            {/* Main Content */}
            <main className="max-w-6xl mx-auto px-6 py-12">

                <div className="text-center mb-10">

                    <h2 className="text-4xl font-bold text-gray-800">
                        Know Your Cost. Know Your Profit.
                    </h2>

                    <p className="text-gray-600 mt-3 text-lg">
                        Calculate the real cost of making your products.
                    </p>

                </div>


                {/* Categories */}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">


                    {/* Processed Food */}

                    <div className="bg-white rounded-xl shadow-md p-8
                                    hover:shadow-xl transition cursor-pointer">

                        <div className="text-5xl mb-5">
                            🍱
                        </div>

                        <h3 className="text-2xl font-semibold text-gray-800">
                            Processed Food
                        </h3>

                        <p className="text-gray-500 mt-3">
                            Calculate the cost of food and processed food products.
                        </p>

                        <button className="mt-6 text-blue-600 font-semibold">
                            View Products →
                        </button>

                    </div>


                    {/* Puja */}

            <Link
    to="/category/puja"
    className="bg-white rounded-xl shadow-md p-8
               hover:shadow-xl transition cursor-pointer
               block"
>

    <div className="text-5xl mb-5">
        🪔
    </div>

    <h3 className="text-2xl font-semibold text-gray-800">
        Puja Products
    </h3>

    <p className="text-gray-500 mt-3">
        Calculate the cost of puja and spiritual products.
    </p>

    <div className="mt-6 text-blue-600 font-semibold">
        View Products →
    </div>

</Link>


                    {/* Wash */}

                    <div className="bg-white rounded-xl shadow-md p-8
                                    hover:shadow-xl transition cursor-pointer">

                        <div className="text-5xl mb-5">
                            🧴
                        </div>

                        <h3 className="text-2xl font-semibold text-gray-800">
                            Wash Products
                        </h3>

                        <p className="text-gray-500 mt-3">
                            Calculate the cost of cleaning and wash products.
                        </p>

                        <button className="mt-6 text-blue-600 font-semibold">
                            View Products →
                        </button>

                    </div>


                </div>

            </main>

        </div>
    )
}

export default Home