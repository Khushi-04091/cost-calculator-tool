// // import { useEffect, useState } from "react"
// // import { useNavigate } from "react-router-dom"
// // import { getProducts } from "../services/api"

// // function ProductSelection() {
// //     const [products, setProducts] = useState([])
// //     const [loading, setLoading] = useState(true)
// //     const [error, setError] = useState("")

// //     const navigate = useNavigate()

// //     useEffect(() => {
// //         async function loadProducts() {
// //             try {
// //                 const data = await getProducts()
// //                 setProducts(data)
// //             } catch (error) {
// //                 console.error(error)
// //                 setError("Unable to load products")
// //             } finally {
// //                 setLoading(false)
// //             }
// //         }

// //         loadProducts()
// //     }, [])

// //     function selectProduct(product) {
// //         navigate(`/calculator/${product.id}`)
// //     }

// //     if (loading) {
// //         return (
// //             <div className="min-h-screen flex items-center justify-center">
// //                 <p className="text-lg">Loading products...</p>
// //             </div>
// //         )
// //     }

// //     if (error) {
// //         return (
// //             <div className="min-h-screen flex items-center justify-center">
// //                 <p className="text-red-500">{error}</p>
// //             </div>
// //         )
// //     }

// //     return (
// //         <div className="min-h-screen bg-gray-50 px-4 py-8">
// //             <div className="max-w-5xl mx-auto">

// //                 <h1 className="text-3xl font-bold text-center">
// //                     What do you want to calculate?
// //                 </h1>

// //                 <p className="text-center text-gray-600 mt-2">
// //                     Select a product to calculate its actual cost.
// //                 </p>

// //                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">

// //                     {products.map((product) => (
// //                         <button
// //                             key={product.id}
// //                             onClick={() => selectProduct(product)}
// //                             className="bg-white p-6 rounded-xl shadow hover:shadow-lg text-left transition"
// //                         >
// //                             <h2 className="text-xl font-semibold">
// //                                 {product.name}
// //                             </h2>

// //                             <p className="text-gray-600 mt-2">
// //                                 {product.description}
// //                             </p>

// //                             <p className="text-sm text-gray-500 mt-4">
// //                                 Unit: {product.unit}
// //                             </p>
// //                         </button>
// //                     ))}

// //                 </div>

// //             </div>
// //         </div>
// //     )
// // }

// // export default ProductSelection


// import { useEffect, useState } from "react"
// import { useNavigate } from "react-router-dom"
// import { getProducts } from "../api"


// function ProductSelection() {

//     const [products, setProducts] = useState([])
//     const [loading, setLoading] = useState(true)
//     const [error, setError] = useState("")

//     const navigate = useNavigate()


//     useEffect(() => {

//         const fetchProducts = async () => {

//             try {
//                 const data = await getProducts()

//                 setProducts(data)

//             } catch (error) {

//                 setError("Unable to load products")

//             } finally {

//                 setLoading(false)

//             }
//         }

//         fetchProducts()

//     }, [])


//     if (loading) {
//         return (
//             <div className="min-h-screen flex items-center justify-center">
//                 <p className="text-lg">Loading products...</p>
//             </div>
//         )
//     }


//     if (error) {
//         return (
//             <div className="min-h-screen flex items-center justify-center">
//                 <p className="text-red-500">{error}</p>
//             </div>
//         )
//     }


//     return (
//         <div className="min-h-screen bg-gray-50 px-6 py-10">

//             <div className="max-w-6xl mx-auto">

//                 <h1 className="text-3xl font-bold text-gray-800">
//                     Select Your Product
//                 </h1>

//                 <p className="text-gray-600 mt-2 mb-8">
//                     Choose a product to calculate its actual production cost.
//                 </p>


//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

//                     {products.map((product) => (

//                         <div
//                             key={product.id}
//                             onClick={() => navigate(`/calculator/${product.id}`)}
//                             className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 cursor-pointer hover:shadow-md hover:border-gray-400 transition"
//                         >

//                             <h2 className="text-xl font-semibold text-gray-800">
//                                 {product.name}
//                             </h2>

//                             <p className="text-gray-500 mt-2">
//                                 {product.description}
//                             </p>

//                             <div className="mt-4 text-sm text-gray-600">
//                                 Unit: <span className="font-medium">
//                                     {product.unit}
//                                 </span>
//                             </div>

//                             <button
//                                 className="mt-5 w-full bg-black text-white py-2 rounded-lg"
//                             >
//                                 Calculate Cost
//                             </button>

//                         </div>

//                     ))}

//                 </div>

//             </div>

//         </div>
//     )
// }


// export default ProductSelection


import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getProducts } from "../api"


function ProductSelection() {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [search, setSearch] = useState("")
    const [category, setCategory] = useState("All")

    const navigate = useNavigate()


    useEffect(() => {

        const fetchProducts = async () => {

            try {

                const data = await getProducts()

                setProducts(data)

            } catch (error) {

                setError("Unable to load products")

            } finally {

                setLoading(false)

            }
        }

        fetchProducts()

    }, [])


    const categories = [
        "All",
        ...new Set(products.map(product => product.category))
    ]


    const filteredProducts = products.filter(product => {

        const matchesSearch =
            product.name
                .toLowerCase()
                .includes(search.toLowerCase())

        const matchesCategory =
            category === "All" ||
            product.category === category

        return matchesSearch && matchesCategory
    })


    if (loading) {

        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">

                <div className="text-center">

                    <div className="w-10 h-10 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>

                    <p className="mt-4 text-slate-500">
                        Loading products...
                    </p>

                </div>

            </div>
        )
    }


    if (error) {

        return (
            <div className="min-h-screen flex items-center justify-center">

                <div className="text-center">

                    <div className="text-4xl">
                        ⚠️
                    </div>

                    <p className="mt-3 text-red-500">
                        {error}
                    </p>

                </div>

            </div>
        )
    }


    return (
        <div className="min-h-screen bg-slate-50">

            {/* Header */}

            <header className="bg-white border-b border-slate-200 sticky top-0 z-20">

                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

                    <div className="flex items-center gap-3">

                        <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center text-xl shadow-sm">
                            ₹
                        </div>

                        <div>
                            <h1 className="font-bold text-slate-900">
                                CostWise
                            </h1>

                            <p className="text-xs text-slate-500">
                                Production Cost Calculator
                            </p>
                        </div>

                    </div>


                    <button
                        className="hidden sm:block text-sm text-slate-600 hover:text-blue-600 transition"
                    >
                        How it works
                    </button>

                </div>

            </header>


            <main className="max-w-7xl mx-auto px-6 py-12">


                {/* Hero */}

                <section className="text-center max-w-3xl mx-auto">

                    <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                        <span>💡</span>
                        Make better pricing decisions
                    </div>


                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mt-6">
                        Know Your Cost.
                        <span className="text-blue-600">
                            {" "}Know Your Profit.
                        </span>
                    </h2>


                    <p className="text-lg text-slate-500 mt-5">
                        Calculate the real cost of making your products
                        and find a selling price that protects your profit.
                    </p>

                </section>


                {/* Search */}

                <section className="max-w-2xl mx-auto mt-10">

                    <div className="relative">

                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
                            🔎
                        </span>

                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search for a product..."
                            className="w-full bg-white border border-slate-200 rounded-2xl px-12 py-4 outline-none shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        />

                    </div>

                </section>


                {/* Category filters */}

                <div className="flex flex-wrap justify-center gap-3 mt-6">

                    {categories.map(item => (

                        <button
                            key={item}
                            onClick={() => setCategory(item)}
                            className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                                category === item
                                    ? "bg-blue-600 text-white shadow-sm"
                                    : "bg-white text-slate-600 border border-slate-200 hover:border-blue-300 hover:text-blue-600"
                            }`}
                        >
                            {item}
                        </button>

                    ))}

                </div>


                {/* Product count */}

                <div className="flex justify-between items-center mt-12 mb-5">

                    <div>

                        <h3 className="text-xl font-bold text-slate-900">
                            Choose a product
                        </h3>

                        <p className="text-sm text-slate-500 mt-1">
                            {filteredProducts.length} products available
                        </p>

                    </div>

                </div>


                {/* Product cards */}

                {filteredProducts.length === 0 ? (

                    <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">

                        <div className="text-4xl">
                            🔍
                        </div>

                        <h3 className="font-semibold text-slate-900 mt-4">
                            No products found
                        </h3>

                        <p className="text-slate-500 mt-1">
                            Try another product name or category.
                        </p>

                    </div>

                ) : (

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

                        {filteredProducts.map((product) => (

                            <div
                                key={product.id}
                                className="group bg-white rounded-2xl border border-slate-200 p-6 hover:-translate-y-1 hover:shadow-xl hover:border-blue-200 transition-all duration-300"
                            >

                                {/* Icon */}

                                <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-2xl">
                                    {product.category === "Food"
                                        ? "🍲"
                                        : product.category === "Cleaning"
                                            ? "🧴"
                                            : "🪔"
                                    }
                                </div>


                                <div className="mt-5">

                                    <div className="flex justify-between items-start gap-3">

                                        <h3 className="text-xl font-bold text-slate-900">
                                            {product.name}
                                        </h3>

                                        <span className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded-full whitespace-nowrap">
                                            {product.unit}
                                        </span>

                                    </div>


                                    <p className="text-slate-500 text-sm mt-2 min-h-10">
                                        {product.description}
                                    </p>

                                </div>


                                {/* Button */}

                                <button
                                    onClick={() =>
                                        navigate(`/calculator/${product.id}`)
                                    }
                                    className="w-full mt-6 bg-slate-900 text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 group-hover:bg-blue-600 transition-colors"
                                >
                                    Start Costing

                                    <span className="group-hover:translate-x-1 transition-transform">
                                        →
                                    </span>

                                </button>

                            </div>

                        ))}

                    </div>

                )}

            </main>

        </div>
    )
}


export default ProductSelection