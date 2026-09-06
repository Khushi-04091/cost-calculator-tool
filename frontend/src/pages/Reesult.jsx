import { useLocation, useNavigate } from "react-router-dom"

function Result() {
    const location = useLocation()
    const navigate = useNavigate()

    const result = location.state?.result
    const product = location.state?.product

    if (!result || !product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-xl font-bold">
                        No calculation found
                    </h1>

                    <button
                        onClick={() => navigate("/products")}
                        className="mt-4 bg-black text-white px-5 py-3 rounded-lg"
                    >
                        Select Product
                    </button>
                </div>
            </div>
        )
    }

    const money = (value) =>
        `₹${Number(value || 0).toFixed(2)}`

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-8">

            <div className="max-w-2xl mx-auto">

                {/* Header */}
                <div className="bg-white rounded-xl shadow p-6 text-center mb-6">

                    <h1 className="text-3xl font-bold">
                        Your Cost Calculation
                    </h1>

                    <p className="text-gray-600 mt-2">
                        {product.name}
                    </p>

                </div>


                {/* Total Cost */}
                <div className="bg-white rounded-xl shadow p-6 mb-6">

                    <h2 className="text-xl font-bold mb-5">
                        Cost Breakdown
                    </h2>

                    <div className="space-y-4">

                        <div className="flex justify-between">
                            <span>Raw Materials</span>
                            <span className="font-semibold">
                                {money(result.rawMaterialCost)}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span>Labour</span>
                            <span className="font-semibold">
                                {money(result.labourCost)}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span>Production</span>
                            <span className="font-semibold">
                                {money(result.productionCost)}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span>Packaging</span>
                            <span className="font-semibold">
                                {money(result.packagingCost)}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span>Other Expenses</span>
                            <span className="font-semibold">
                                {money(result.otherCost)}
                            </span>
                        </div>

                        <hr />

                        <div className="flex justify-between text-lg">
                            <span className="font-bold">
                                Total Cost
                            </span>

                            <span className="font-bold">
                                {money(result.totalCost)}
                            </span>
                        </div>

                    </div>

                </div>


                {/* Unit Cost */}
                <div className="bg-white rounded-xl shadow p-6 mb-6">

                    <h2 className="text-xl font-bold mb-4">
                        Actual Cost
                    </h2>

                    <div className="flex justify-between mb-3">
                        <span>Finished Output</span>

                        <span className="font-semibold">
                            {result.actualOutput} {product.unit}
                        </span>
                    </div>

                    <div className="flex justify-between text-lg">

                        <span className="font-bold">
                            Cost per {product.unit}
                        </span>

                        <span className="font-bold">
                            {money(result.costPerUnit)}
                        </span>

                    </div>

                </div>


                {/* Profit */}
                <div className="bg-white rounded-xl shadow p-6 mb-6">

                    <h2 className="text-xl font-bold mb-4">
                        Profit
                    </h2>

                    <div className="flex justify-between mb-3">
                        <span>Desired Profit</span>

                        <span className="font-semibold">
                            {result.profitPercentage}%
                        </span>
                    </div>

                    <div className="flex justify-between">

                        <span>
                            Profit per {product.unit}
                        </span>

                        <span className="font-semibold">
                            {money(result.profitPerUnit)}
                        </span>

                    </div>

                </div>


                {/* Selling Price */}
                <div className="bg-white rounded-xl shadow p-6 mb-6 text-center">

                    <p className="text-gray-600">
                        Suggested Selling Price
                    </p>

                    <p className="text-4xl font-bold mt-2">
                        {money(result.sellingPrice)}
                    </p>

                    <p className="text-gray-600 mt-2">
                        per {product.unit}
                    </p>

                </div>


                {/* Educational message */}
                <div className="bg-gray-100 rounded-xl p-5 mb-6">

                    <h2 className="font-bold text-lg">
                        💡 Remember
                    </h2>

                    <p className="text-gray-700 mt-2">
                        This is approximately what it costs you to
                        make one {product.unit} of your product.
                    </p>

                    <p className="text-gray-700 mt-2">
                        If you sell below your actual cost, you may
                        not recover the full money spent on making
                        the product.
                    </p>

                </div>


                {/* Buttons */}
                <div className="flex gap-3">

                    <button
                        onClick={() =>
                            navigate(`/calculator/${product.id}`)
                        }
                        className="flex-1 border border-gray-300 bg-white py-3 rounded-lg font-semibold"
                    >
                        Change Calculation
                    </button>

                    <button
                        onClick={() => navigate("/products")}
                        className="flex-1 bg-black text-white py-3 rounded-lg font-semibold"
                    >
                        Another Product
                    </button>

                </div>

            </div>

        </div>
    )
}

export default Result