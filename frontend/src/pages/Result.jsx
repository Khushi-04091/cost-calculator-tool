// // import { useEffect, useState } from "react"
// // import { useNavigate } from "react-router-dom"
// // import { useCalculator } from "../context/CalculatorContext"

// // function Result() {

// //     const navigate = useNavigate()

// //     const { calculatorData } = useCalculator()

// //     const [result, setResult] = useState(null)

// //     const [profitPercentage, setProfitPercentage] = useState(
// //         calculatorData.profitPercentage || 20
// //     )

// //     const [loading, setLoading] = useState(true)

// //     const [error, setError] = useState("")


// //     // ==========================================
// //     // CALCULATE FINAL COST USING BACKEND
// //     // ==========================================

// //     useEffect(() => {

// //         const calculateCost = async () => {

// //             try {

// //                 const response = await fetch(
// //                     "http://localhost:5000/api/products/1/calculate",
// //                     {
// //                         method: "POST",

// //                         headers: {
// //                             "Content-Type": "application/json"
// //                         },

// //                         body: JSON.stringify({
// //                             rawMaterials:
// //                                 calculatorData.rawMaterials || [],

// //                             fragrance:
// //                                 calculatorData.fragrance || {}
// //                         })
// //                     }
// //                 )


// //                 const data = await response.json()


// //                 if (!data.success) {
// //                     throw new Error(
// //                         data.message ||
// //                         "Failed to calculate cost"
// //                     )
// //                 }


// //                 setResult(data.result)

// //             } catch (error) {

// //                 console.error(error)

// //                 setError(
// //                     "Unable to calculate final cost."
// //                 )

// //             } finally {

// //                 setLoading(false)

// //             }

// //         }


// //         calculateCost()

// //     }, [calculatorData])


// //     // ==========================================
// //     // LOADING
// //     // ==========================================

// //     if (loading) {

// //         return (
// //             <div className="min-h-screen bg-gray-100
// //                             flex items-center justify-center">

// //                 <p className="text-xl text-gray-600">
// //                     Calculating your final cost...
// //                 </p>

// //             </div>
// //         )

// //     }


// //     // ==========================================
// //     // ERROR
// //     // ==========================================

// //     if (error) {

// //         return (
// //             <div className="min-h-screen bg-gray-100
// //                             flex items-center justify-center">

// //                 <div className="bg-white p-8 rounded-xl
// //                                 shadow-md text-center">

// //                     <p className="text-red-600 text-lg">
// //                         {error}
// //                     </p>

// //                     <button
// //                         onClick={() => window.location.reload()}
// //                         className="mt-4 bg-blue-600 text-white
// //                                    px-6 py-3 rounded-lg"
// //                     >
// //                         Try Again
// //                     </button>

// //                 </div>

// //             </div>
// //         )

// //     }


// //     if (!result) {
// //         return null
// //     }


// //     // ==========================================
// //     // PROFIT
// //     // ==========================================

// //     const profitAmount =
// //         Number(result.finalCostPerPack) *
// //         Number(profitPercentage) /
// //         100


// //     const sellingPrice =
// //         Number(result.finalCostPerPack) +
// //         profitAmount


// //     return (

// //         <div className="min-h-screen bg-gray-100 p-6">

// //             <div className="max-w-4xl mx-auto">

// //                 {/* Heading */}

// //                 <h1 className="text-3xl font-bold text-gray-800">
// //                     Final Cost
// //                 </h1>

// //                 <p className="text-gray-600 mt-2">
// //                     Here is the complete cost of making one
// //                     Agarbatti pack.
// //                 </p>


// //                 {/* Raw Batti */}

// //                 <div className="bg-white rounded-xl
// //                                 shadow-md p-6 mt-8">

// //                     <h2 className="text-xl font-semibold
// //                                    text-gray-800">

// //                         1. Raw Batti Cost
// //                     </h2>


// //                     <div className="mt-5 space-y-3">

// //                         <div className="flex justify-between">

// //                             <span>
// //                                 Raw material cost
// //                             </span>

// //                             <span>
// //                                 ₹{result.rawMaterialCostPerKg.toFixed(2)}/kg
// //                             </span>

// //                         </div>


// //                         <div className="flex justify-between">

// //                             <span>
// //                                 Electricity
// //                             </span>

// //                             <span>
// //                                 ₹{result.electricityCostPerKg.toFixed(2)}/kg
// //                             </span>

// //                         </div>


// //                         <div className="flex justify-between">

// //                             <span>
// //                                 Maintenance
// //                             </span>

// //                             <span>
// //                                 ₹{result.maintenanceCostPerKg.toFixed(2)}/kg
// //                             </span>

// //                         </div>


// //                         <div className="flex justify-between">

// //                             <span>
// //                                 General overhead
// //                             </span>

// //                             <span>
// //                                 ₹{result.overheadCostPerKg.toFixed(2)}/kg
// //                             </span>

// //                         </div>


// //                         <div className="flex justify-between">

// //                             <span>
// //                                 Cost before final wastage
// //                             </span>

// //                             <span>
// //                                 ₹{result.rawBattiCostBeforeWastage.toFixed(2)}/kg
// //                             </span>

// //                         </div>


// //                         <div className="border-t pt-3
// //                                         flex justify-between">

// //                             <span className="font-semibold">
// //                                 Raw Batti cost
// //                             </span>

// //                             <span className="font-bold
// //                                              text-green-700">

// //                                 ₹{result.rawBattiCostPerKg.toFixed(2)}/kg

// //                             </span>

// //                         </div>

// //                     </div>

// //                 </div>


// //                 {/* Fragrance */}

// //                 <div className="bg-white rounded-xl
// //                                 shadow-md p-6 mt-6">

// //                     <h2 className="text-xl font-semibold
// //                                    text-gray-800">

// //                         2. Fragrance & Processing
// //                     </h2>


// //                     <div className="mt-5 space-y-3">

// //                         <div className="flex justify-between">

// //                             <span>
// //                                 Mixed fragrance cost
// //                             </span>

// //                             <span>
// //                                 ₹{result.mixedFragranceCost.toFixed(2)}/kg
// //                             </span>

// //                         </div>


// //                         <div className="flex justify-between">

// //                             <span>
// //                                 Fragrance cost
// //                             </span>

// //                             <span>
// //                                 ₹{result.fragranceCostPerKg.toFixed(2)}/kg
// //                             </span>

// //                         </div>


// //                         <div className="flex justify-between">

// //                             <span>
// //                                 Dipping labour
// //                             </span>

// //                             <span>
// //                                 ₹{result.dippingLabourPerKg.toFixed(2)}/kg
// //                             </span>

// //                         </div>


// //                         <div className="border-t pt-3
// //                                         flex justify-between">

// //                             <span className="font-semibold">
// //                                 Processing cost
// //                             </span>

// //                             <span className="font-bold
// //                                              text-green-700">

// //                                 ₹{result.processingCostPerKg.toFixed(2)}/kg

// //                             </span>

// //                         </div>


// //                         <div className="border-t pt-3
// //                                         flex justify-between">

// //                             <span className="font-semibold">
// //                                 Complete Agarbatti cost
// //                             </span>

// //                             <span className="font-bold
// //                                              text-green-700">

// //                                 ₹{result.dippedAgarbattiCostPerKg.toFixed(2)}/kg

// //                             </span>

// //                         </div>

// //                     </div>

// //                 </div>


// //                 {/* Packaging */}

// //                 <div className="bg-white rounded-xl
// //                                 shadow-md p-6 mt-6">

// //                     <h2 className="text-xl font-semibold
// //                                    text-gray-800">

// //                         3. Packaging Cost
// //                     </h2>


// //                     <div className="mt-5 space-y-3">

// //                         <div className="flex justify-between">

// //                             <span>
// //                                 Agarbatti content
// //                             </span>

// //                             <span>
// //                                 ₹{result.agarbattiContentCostPerPack.toFixed(2)}
// //                             </span>

// //                         </div>


// //                         <div className="flex justify-between">

// //                             <span>
// //                                 Primary packaging
// //                             </span>

// //                             <span>
// //                                 ₹{result.primaryPackagingCost.toFixed(2)}
// //                             </span>

// //                         </div>


// //                         <div className="flex justify-between">

// //                             <span>
// //                                 Secondary packaging
// //                             </span>

// //                             <span>
// //                                 ₹{result.secondaryPackagingCost.toFixed(2)}
// //                             </span>

// //                         </div>


// //                         <div className="flex justify-between">

// //                             <span>
// //                                 Tertiary packaging
// //                             </span>

// //                             <span>
// //                                 ₹{result.tertiaryPackagingCost.toFixed(2)}
// //                             </span>

// //                         </div>


// //                         <div className="flex justify-between">

// //                             <span>
// //                                 Filling labour
// //                             </span>

// //                             <span>
// //                                 ₹{result.fillingLabourPerPack.toFixed(2)}
// //                             </span>

// //                         </div>


// //                         <div className="flex justify-between">

// //                             <span>
// //                                 Sealing labour
// //                             </span>

// //                             <span>
// //                                 ₹{result.sealingLabourPerPack.toFixed(2)}
// //                             </span>

// //                         </div>

// //                     </div>

// //                 </div>


// //                 {/* FINAL COST */}

// //                 <div className="bg-green-50
// //                                 border border-green-200
// //                                 rounded-xl p-6 mt-8">

// //                     <h2 className="text-xl font-semibold
// //                                    text-green-800">

// //                         Final Cost Per Pack
// //                     </h2>


// //                     <p className="text-gray-600 mt-3">
// //                         Cost of one 20-stick Agarbatti pack
// //                     </p>


// //                     <p className="text-4xl font-bold
// //                                   text-green-700 mt-3">

// //                         ₹{result.finalCostPerPack.toFixed(2)}

// //                     </p>

// //                 </div>


// //                 {/* PROFIT */}

// //                 <div className="bg-white rounded-xl
// //                                 shadow-md p-6 mt-6">

// //                     <h2 className="text-xl font-semibold
// //                                    text-gray-800">

// //                         4. Add Your Profit
// //                     </h2>


// //                     <p className="text-gray-500 mt-2">
// //                         How much profit do you want to earn?
// //                     </p>


// //                     <div className="flex items-center
// //                                     gap-3 mt-5">

// //                         <input
// //                             type="number"
// //                             value={profitPercentage}
// //                             onChange={(e) =>
// //                                 setProfitPercentage(
// //                                     e.target.value
// //                                 )
// //                             }
// //                             className="border border-gray-300
// //                                        rounded-lg p-3 w-full"
// //                         />

// //                         <span className="text-gray-600">
// //                             %
// //                         </span>

// //                     </div>


// //                     <div className="bg-green-50
// //                                     rounded-lg p-4 mt-5">

// //                         <p className="text-gray-600">
// //                             Profit per pack
// //                         </p>

// //                         <p className="text-2xl font-bold
// //                                       text-green-700">

// //                             ₹{profitAmount.toFixed(2)}

// //                         </p>

// //                     </div>

// //                 </div>


// //                 {/* SELLING PRICE */}

// //                 <div className="bg-blue-50
// //                                 border border-blue-200
// //                                 rounded-xl p-6 mt-6">

// //                     <h2 className="text-xl font-semibold
// //                                    text-blue-800">

// //                         Recommended Selling Price
// //                     </h2>


// //                     <p className="text-gray-600 mt-2">
// //                         Cost + your selected profit
// //                     </p>


// //                     <p className="text-4xl font-bold
// //                                   text-blue-700 mt-3">

// //                         ₹{sellingPrice.toFixed(2)}

// //                     </p>

// //                 </div>


// //                 {/* Back */}

// //                 <button
// //                     onClick={() =>
// //                         navigate(
// //                             "/product/agarbatti/packaging"
// //                         )
// //                     }
// //                     className="mt-8 bg-gray-600
// //                                text-white px-8 py-4
// //                                rounded-xl font-semibold
// //                                text-lg hover:bg-gray-700"
// //                 >
// //                     ← Back to Packaging
// //                 </button>

// //             </div>

// //         </div>

// //     )
// // }

// // export default Result

// import { useLocation, useNavigate } from "react-router-dom"

// function Result() {
//     const location = useLocation()
//     const navigate = useNavigate()

//     const result = location.state?.result
//     const product = location.state?.product

//     if (!result || !product) {
//         return (
//             <div className="min-h-screen flex items-center justify-center">
//                 <div className="text-center">
//                     <h1 className="text-xl font-bold">
//                         No calculation found
//                     </h1>

//                     <button
//                         onClick={() => navigate("/products")}
//                         className="mt-4 bg-black text-white px-5 py-3 rounded-lg"
//                     >
//                         Select Product
//                     </button>
//                 </div>
//             </div>
//         )
//     }

//     const money = (value) =>
//         `₹${Number(value || 0).toFixed(2)}`

//     return (
//         <div className="min-h-screen bg-gray-50 px-4 py-8">

//             <div className="max-w-2xl mx-auto">

//                 {/* Header */}
//                 <div className="bg-white rounded-xl shadow p-6 text-center mb-6">

//                     <h1 className="text-3xl font-bold">
//                         Your Cost Calculation
//                     </h1>

//                     <p className="text-gray-600 mt-2">
//                         {product.name}
//                     </p>

//                 </div>


//                 {/* Total Cost */}
//                 <div className="bg-white rounded-xl shadow p-6 mb-6">

//                     <h2 className="text-xl font-bold mb-5">
//                         Cost Breakdown
//                     </h2>

//                     <div className="space-y-4">

//                         <div className="flex justify-between">
//                             <span>Raw Materials</span>
//                             <span className="font-semibold">
//                                 {money(result.rawMaterialCost)}
//                             </span>
//                         </div>

//                         <div className="flex justify-between">
//                             <span>Labour</span>
//                             <span className="font-semibold">
//                                 {money(result.labourCost)}
//                             </span>
//                         </div>

//                         <div className="flex justify-between">
//                             <span>Production</span>
//                             <span className="font-semibold">
//                                 {money(result.productionCost)}
//                             </span>
//                         </div>

//                         <div className="flex justify-between">
//                             <span>Packaging</span>
//                             <span className="font-semibold">
//                                 {money(result.packagingCost)}
//                             </span>
//                         </div>

//                         <div className="flex justify-between">
//                             <span>Other Expenses</span>
//                             <span className="font-semibold">
//                                 {money(result.otherCost)}
//                             </span>
//                         </div>

//                         <hr />

//                         <div className="flex justify-between text-lg">
//                             <span className="font-bold">
//                                 Total Cost
//                             </span>

//                             <span className="font-bold">
//                                 {money(result.totalCost)}
//                             </span>
//                         </div>

//                     </div>

//                 </div>


//                 {/* Unit Cost */}
//                 <div className="bg-white rounded-xl shadow p-6 mb-6">

//                     <h2 className="text-xl font-bold mb-4">
//                         Actual Cost
//                     </h2>

//                     <div className="flex justify-between mb-3">
//                         <span>Finished Output</span>

//                         <span className="font-semibold">
//                             {result.actualOutput} {product.unit}
//                         </span>
//                     </div>

//                     <div className="flex justify-between text-lg">

//                         <span className="font-bold">
//                             Cost per {product.unit}
//                         </span>

//                         <span className="font-bold">
//                             {money(result.costPerUnit)}
//                         </span>

//                     </div>

//                 </div>


//                 {/* Profit */}
//                 <div className="bg-white rounded-xl shadow p-6 mb-6">

//                     <h2 className="text-xl font-bold mb-4">
//                         Profit
//                     </h2>

//                     <div className="flex justify-between mb-3">
//                         <span>Desired Profit</span>

//                         <span className="font-semibold">
//                             {result.profitPercentage}%
//                         </span>
//                     </div>

//                     <div className="flex justify-between">

//                         <span>
//                             Profit per {product.unit}
//                         </span>

//                         <span className="font-semibold">
//                             {money(result.profitPerUnit)}
//                         </span>

//                     </div>

//                 </div>


//                 {/* Selling Price */}
//                 <div className="bg-white rounded-xl shadow p-6 mb-6 text-center">

//                     <p className="text-gray-600">
//                         Suggested Selling Price
//                     </p>

//                     <p className="text-4xl font-bold mt-2">
//                         {money(result.sellingPrice)}
//                     </p>

//                     <p className="text-gray-600 mt-2">
//                         per {product.unit}
//                     </p>

//                 </div>


//                 {/* Educational message */}
//                 <div className="bg-gray-100 rounded-xl p-5 mb-6">

//                     <h2 className="font-bold text-lg">
//                         💡 Remember
//                     </h2>

//                     <p className="text-gray-700 mt-2">
//                         This is approximately what it costs you to
//                         make one {product.unit} of your product.
//                     </p>

//                     <p className="text-gray-700 mt-2">
//                         If you sell below your actual cost, you may
//                         not recover the full money spent on making
//                         the product.
//                     </p>

//                 </div>


//                 {/* Buttons */}
//                 <div className="flex gap-3">

//                     <button
//                         onClick={() =>
//                             navigate(`/calculator/${product.id}`)
//                         }
//                         className="flex-1 border border-gray-300 bg-white py-3 rounded-lg font-semibold"
//                     >
//                         Change Calculation
//                     </button>

//                     <button
//                         onClick={() => navigate("/products")}
//                         className="flex-1 bg-black text-white py-3 rounded-lg font-semibold"
//                     >
//                         Another Product
//                     </button>

//                 </div>

//             </div>

//         </div>
//     )
// }

// export default Result


import { useLocation, useNavigate } from "react-router-dom"


function Result() {

    const { state } = useLocation()
    const navigate = useNavigate()


    if (!state) {

        return (
            <div className="min-h-screen flex items-center justify-center">

                <div className="text-center">

                    <p className="text-gray-600">
                        No calculation result found.
                    </p>

                    <button
                        onClick={() => navigate("/products")}
                        className="mt-4 bg-black text-white px-5 py-2 rounded-lg"
                    >
                        Select Product
                    </button>

                </div>

            </div>
        )
    }


    return (
        <div className="min-h-screen bg-gray-50 px-6 py-10">

            <div className="max-w-3xl mx-auto">

                <h1 className="text-3xl font-bold text-gray-800">
                    Cost Calculation Result
                </h1>

                <p className="text-gray-600 mt-2">
                    {state.product.name}
                </p>


                {/* Cost Breakdown */}

                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mt-8">

                    <h2 className="text-xl font-semibold mb-5">
                        Cost Breakdown
                    </h2>


                    <div className="space-y-4">

                        <div className="flex justify-between">
                            <span>Raw Materials</span>
                            <span>₹{state.breakdown.rawMaterialCost}</span>
                        </div>

                        <div className="flex justify-between">
                            <span>Labour</span>
                            <span>₹{state.breakdown.labour}</span>
                        </div>

                        <div className="flex justify-between">
                            <span>Production</span>
                            <span>₹{state.breakdown.production}</span>
                        </div>

                        <div className="flex justify-between">
                            <span>Packaging</span>
                            <span>₹{state.breakdown.packagingCost}</span>
                        </div>

                        <div className="flex justify-between">
                            <span>Other Expenses</span>
                            <span>₹{state.breakdown.otherExpense}</span>
                        </div>


                        <div className="border-t pt-4 flex justify-between font-bold text-lg">
                            <span>Total Cost</span>
                            <span>₹{state.totalCost}</span>
                        </div>

                    </div>

                </div>


                {/* Main Result */}

                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mt-6">

                    <div className="space-y-5">

                        <div className="flex justify-between">
                            <span>Finished Output</span>
                            <span>
                                {state.finishedOutput} {state.product.unit}
                            </span>
                        </div>


                        <div className="flex justify-between text-lg font-semibold">
                            <span>Actual Cost per {state.product.unit}</span>
                            <span>₹{state.costPerUnit}</span>
                        </div>


                        <div className="flex justify-between">
                            <span>Profit</span>
                            <span>
                                {state.profitPercent}%
                            </span>
                        </div>


                        <div className="flex justify-between">
                            <span>Profit per {state.product.unit}</span>
                            <span>
                                ₹{state.profitPerUnit}
                            </span>
                        </div>


                        <div className="border-t pt-5 flex justify-between text-xl font-bold">
                            <span>Suggested Selling Price</span>
                            <span>
                                ₹{state.sellingPrice} / {state.product.unit}
                            </span>
                        </div>

                    </div>

                </div>


                {/* Educational Message */}

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mt-6">

                    <h2 className="font-semibold text-blue-900">
                        What does this mean?
                    </h2>

                    <p className="text-blue-800 mt-2">
                        Your actual cost of making 1 {state.product.unit}
                        is approximately ₹{state.costPerUnit}.
                    </p>

                    <p className="text-blue-800 mt-2">
                        With a {state.profitPercent}% profit,
                        your suggested selling price is ₹{state.sellingPrice}
                        per {state.product.unit}.
                    </p>

                    <p className="text-blue-800 mt-2">
                        Selling below your actual cost may mean that you
                        are not recovering the full cost of production.
                    </p>

                </div>


                <button
                    onClick={() => navigate(`/calculator/${state.product.id}`)}
                    className="w-full bg-black text-white py-3 rounded-xl mt-8"
                >
                    Calculate Again
                </button>

            </div>

        </div>
    )
}


export default Result