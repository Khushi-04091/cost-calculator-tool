// // // import { useEffect, useState } from "react"
// // // import {  useNavigate,useParams } from "react-router-dom"

// // // import {
// // //     getProduct,
// // //     getProductMaterials,
// // //     getProductConfig,
// // //     getProductPackaging,
// // //       calculateProductCost
// // // } from "../services/api"

// // // function Calculator() {
// // //     const navigate = useNavigate()
// // //     const { productId } = useParams()

// // //     const [product, setProduct] = useState(null)
// // //     const [materials, setMaterials] = useState([])
// // //     const [config, setConfig] = useState(null)
// // //     const [packaging, setPackaging] = useState([])

// // //     const [labour, setLabour] = useState("")
// // //     const [production, setProduction] = useState("")
// // //     const [actualOutput, setActualOutput] = useState("")
// // //     const [otherExpense, setOtherExpense] = useState("")
// // //     const [profitPercentage, setProfitPercentage] = useState(20)

// // //     const [loading, setLoading] = useState(true)
// // //     const [error, setError] = useState("")

// // //     useEffect(() => {
// // //         async function loadCalculatorData() {
// // //             try {
// // //                 const [
// // //                     productData,
// // //                     materialsData,
// // //                     configData,
// // //                     packagingData
// // //                 ] = await Promise.all([
// // //                     getProduct(productId),
// // //                     getProductMaterials(productId),
// // //                     getProductConfig(productId),
// // //                     getProductPackaging(productId)
// // //                 ])

// // //                 setProduct(productData)
// // //                 setMaterials(materialsData)
// // //                 setConfig(configData)
// // //                 setPackaging(packagingData)
// // //             } catch (error) {
// // //                 console.error(error)
// // //                 setError("Unable to load calculator")
// // //             } finally {
// // //                 setLoading(false)
// // //             }
// // //         }

// // //         loadCalculatorData()
// // //     }, [productId])

// // //     function updateMaterial(index, field, value) {
// // //         setMaterials((previousMaterials) => {
// // //             const updatedMaterials = [...previousMaterials]

// // //             updatedMaterials[index] = {
// // //                 ...updatedMaterials[index],
// // //                 [field]: value
// // //             }

// // //             return updatedMaterials
// // //         })
// // //     }

// // //     function updatePackaging(index, value) {
// // //         setPackaging((previousPackaging) => {
// // //             const updatedPackaging = [...previousPackaging]

// // //             updatedPackaging[index] = {
// // //                 ...updatedPackaging[index],
// // //                 price: value
// // //             }

// // //             return updatedPackaging
// // //         })
// // //     }
// // //     async function handleCalculate() {
// // //     try {

// // //         const data = {
// // //             materials: materials.map((material) => ({
// // //                 name: material.name,
// // //                 quantity: material.quantity,
// // //                 price: material.price
// // //             })),

// // //             labour,
// // //             production,
// // //             actualOutput,

// // //             packaging: packaging.map((item) => ({
// // //                 name: item.name,
// // //                 quantity: item.quantity,
// // //                 price: item.price
// // //             })),

// // //             otherExpense,
// // //             profitPercentage
// // //         }

// // //         const response = await calculateProductCost(
// // //             productId,
// // //             data
// // //         )

// // //         if (!response.success) {
// // //             throw new Error("Calculation failed")
// // //         }

// // //         navigate("/result", {
// // //             state: {
// // //                 result: response.result,
// // //                 product: product
// // //             }
// // //         })

// // //     } catch (error) {
// // //     console.error("Calculator loading error:", error)
// // //     setError(error.message || "Unable to load calculator")
// // // }
// // // }

// // //     if (loading) {
// // //         return (
// // //             <div className="min-h-screen flex items-center justify-center">
// // //                 <p className="text-lg">Loading calculator...</p>
// // //             </div>
// // //         )
// // //     }

// // //     if (error) {
// // //         return (
// // //             <div className="min-h-screen flex items-center justify-center">
// // //                 <p className="text-red-500">{error}</p>
// // //             </div>
// // //         )
// // //     }

// // //     return (
// // //         <div className="min-h-screen bg-gray-50 px-4 py-8">

// // //             <div className="max-w-3xl mx-auto">

// // //                 {/* Product heading */}
// // //                 <div className="bg-white rounded-xl shadow p-6 mb-6">

// // //                     <h1 className="text-3xl font-bold">
// // //                         {product.name}
// // //                     </h1>

// // //                     <p className="text-gray-600 mt-2">
// // //                         Calculate the actual cost of making your product.
// // //                     </p>

// // //                     <div className="mt-4 inline-block bg-gray-100 px-4 py-2 rounded-lg">
// // //                         Unit: <strong>{product.unit}</strong>
// // //                     </div>

// // //                 </div>


// // //                 {/* Raw Materials */}
// // //                 <div className="bg-white rounded-xl shadow p-6 mb-6">

// // //                     <h2 className="text-xl font-bold mb-2">
// // //                         1. Raw Materials
// // //                     </h2>

// // //                     <p className="text-gray-600 mb-5">
// // //                         Enter how much material you used and what you paid for it.
// // //                     </p>

// // //                     {materials.map((material, index) => (

// // //                         <div
// // //                             key={material.raw_material_id}
// // //                             className="border-b py-4 last:border-b-0"
// // //                         >

// // //                             <h3 className="font-semibold">
// // //                                 {material.name}
// // //                             </h3>

// // //                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">

// // //                                 <div>
// // //                                     <label className="block text-sm text-gray-600 mb-1">
// // //                                         Quantity used ({material.unit})
// // //                                     </label>

// // //                                     <input
// // //                                         type="number"
// // //                                         min="0"
// // //                                         value={material.quantity}
// // //                                         onChange={(e) =>
// // //                                             updateMaterial(
// // //                                                 index,
// // //                                                 "quantity",
// // //                                                 e.target.value
// // //                                             )
// // //                                         }
// // //                                         className="w-full border rounded-lg px-3 py-2"
// // //                                     />
// // //                                 </div>

// // //                                 <div>
// // //                                     <label className="block text-sm text-gray-600 mb-1">
// // //                                         Price per {material.unit} (₹)
// // //                                     </label>

// // //                                     <input
// // //                                         type="number"
// // //                                         min="0"
// // //                                         placeholder="Enter price"
// // //                                         value={material.price || ""}
// // //                                         onChange={(e) =>
// // //                                             updateMaterial(
// // //                                                 index,
// // //                                                 "price",
// // //                                                 e.target.value
// // //                                             )
// // //                                         }
// // //                                         className="w-full border rounded-lg px-3 py-2"
// // //                                     />
// // //                                 </div>

// // //                             </div>

// // //                         </div>

// // //                     ))}

// // //                 </div>


// // //                 {/* Labour */}
// // //                 {config?.labour_enabled && (
// // //                     <div className="bg-white rounded-xl shadow p-6 mb-6">

// // //                         <h2 className="text-xl font-bold">
// // //                             2. Labour
// // //                         </h2>

// // //                         <p className="text-gray-600 mt-1 mb-4">
// // //                             Enter the total amount you pay workers for this batch.
// // //                         </p>

// // //                         <input
// // //                             type="number"
// // //                             min="0"
// // //                             placeholder="Enter labour cost"
// // //                             value={labour}
// // //                             onChange={(e) => setLabour(e.target.value)}
// // //                             className="w-full border rounded-lg px-3 py-2"
// // //                         />

// // //                     </div>
// // //                 )}


// // //                 {/* Production */}
// // //                 {config?.production_enabled && (
// // //                     <div className="bg-white rounded-xl shadow p-6 mb-6">

// // //                         <h2 className="text-xl font-bold">
// // //                             3. Production Expenses
// // //                         </h2>

// // //                         <p className="text-gray-600 mt-1 mb-4">
// // //                             Include electricity, gas, fuel or other production costs.
// // //                         </p>

// // //                         <input
// // //                             type="number"
// // //                             min="0"
// // //                             placeholder="Enter production cost"
// // //                             value={production}
// // //                             onChange={(e) => setProduction(e.target.value)}
// // //                             className="w-full border rounded-lg px-3 py-2"
// // //                         />

// // //                     </div>
// // //                 )}


// // //                 {/* Yield */}
// // //                 {config?.yield_enabled && (
// // //                     <div className="bg-white rounded-xl shadow p-6 mb-6">

// // //                         <h2 className="text-xl font-bold">
// // //                             4. Finished Product
// // //                         </h2>

// // //                         <p className="text-gray-600 mt-1 mb-4">
// // //                             How much finished product did you actually get?
// // //                         </p>

// // //                         <div className="flex items-center gap-3">

// // //                             <input
// // //                                 type="number"
// // //                                 min="0"
// // //                                 placeholder="Enter actual output"
// // //                                 value={actualOutput}
// // //                                 onChange={(e) =>
// // //                                     setActualOutput(e.target.value)
// // //                                 }
// // //                                 className="flex-1 border rounded-lg px-3 py-2"
// // //                             />

// // //                             <span className="font-semibold">
// // //                                 {product.unit}
// // //                             </span>

// // //                         </div>

// // //                     </div>
// // //                 )}


// // //                 {/* Packaging */}
// // //                 {config?.packaging_enabled && (
// // //                     <div className="bg-white rounded-xl shadow p-6 mb-6">

// // //                         <h2 className="text-xl font-bold">
// // //                             5. Packaging
// // //                         </h2>

// // //                         <p className="text-gray-600 mt-1 mb-4">
// // //                             Enter the price of the packaging you use.
// // //                         </p>

// // //                         {packaging.map((item, index) => (

// // //                             <div
// // //                                 key={item.packaging_material_id}
// // //                                 className="flex items-center gap-3 mb-3"
// // //                             >

// // //                                 <div className="flex-1">
// // //                                     <p className="font-semibold">
// // //                                         {item.name}
// // //                                     </p>

// // //                                     <p className="text-sm text-gray-500">
// // //                                         Quantity: {item.quantity} {item.unit}
// // //                                     </p>
// // //                                 </div>

// // //                                 <input
// // //                                     type="number"
// // //                                     min="0"
// // //                                     placeholder="Price ₹"
// // //                                     value={item.price || ""}
// // //                                     onChange={(e) =>
// // //                                         updatePackaging(
// // //                                             index,
// // //                                             e.target.value
// // //                                         )
// // //                                     }
// // //                                     className="w-32 border rounded-lg px-3 py-2"
// // //                                 />

// // //                             </div>

// // //                         ))}

// // //                     </div>
// // //                 )}


// // //                 {/* Other expenses */}
// // //                 {config?.other_expense_enabled && (
// // //                     <div className="bg-white rounded-xl shadow p-6 mb-6">

// // //                         <h2 className="text-xl font-bold">
// // //                             6. Other Expenses
// // //                         </h2>

// // //                         <p className="text-gray-600 mt-1 mb-4">
// // //                             Enter any other cost related to this batch.
// // //                         </p>

// // //                         <input
// // //                             type="number"
// // //                             min="0"
// // //                             placeholder="Enter other expenses"
// // //                             value={otherExpense}
// // //                             onChange={(e) =>
// // //                                 setOtherExpense(e.target.value)
// // //                             }
// // //                             className="w-full border rounded-lg px-3 py-2"
// // //                         />

// // //                     </div>
// // //                 )}


// // //                 {/* Profit */}
// // //                 <div className="bg-white rounded-xl shadow p-6 mb-6">

// // //                     <h2 className="text-xl font-bold">
// // //                         7. Desired Profit
// // //                     </h2>

// // //                     <p className="text-gray-600 mt-1 mb-4">
// // //                         How much profit do you want to make?
// // //                     </p>

// // //                     <div className="flex items-center gap-3">

// // //                         <input
// // //                             type="number"
// // //                             min="0"
// // //                             value={profitPercentage}
// // //                             onChange={(e) =>
// // //                                 setProfitPercentage(e.target.value)
// // //                             }
// // //                             className="w-32 border rounded-lg px-3 py-2"
// // //                         />

// // //                         <span className="font-semibold">%</span>

// // //                     </div>

// // //                 </div>


// // //                 {/* Calculate button */}
// // // <button
// // //     onClick={handleCalculate}
// // //     className="w-full bg-black text-white py-4 rounded-xl text-lg font-semibold hover:bg-gray-800"
// // // >
// // //     Calculate Cost
// // // </button>

// // //             </div>

// // //         </div>
// // //     )
// // // }

// // // export default Calculator


// // import { useEffect, useState } from "react"
// // import { useParams } from "react-router-dom"
// // import { getProduct } from "../api"


// // function Calculator() {

// //     const { id } = useParams()

// //     const [data, setData] = useState(null)
// //     const [loading, setLoading] = useState(true)
// //     const [error, setError] = useState("")


// //     useEffect(() => {

// //         const fetchProduct = async () => {

// //             try {

// //                 const result = await getProduct(id)

// //                 setData(result)

// //             } catch (error) {

// //                 setError("Unable to load product")

// //             } finally {

// //                 setLoading(false)

// //             }
// //         }

// //         fetchProduct()

// //     }, [id])


// //     if (loading) {
// //         return (
// //             <div className="min-h-screen flex items-center justify-center">
// //                 <p>Loading calculator...</p>
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
// //         <div className="min-h-screen bg-gray-50 px-6 py-10">

// //             <div className="max-w-4xl mx-auto">

// //                 <h1 className="text-3xl font-bold text-gray-800">
// //                     {data.product.name} Cost Calculator
// //                 </h1>

// //                 <p className="text-gray-600 mt-2">
// //                     Enter the actual cost of the materials and production.
// //                 </p>


// //                 {/* Raw Materials */}

// //                 <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-8">

// //                     <h2 className="text-xl font-semibold">
// //                         1. Raw Materials
// //                     </h2>

// //                     <p className="text-gray-500 text-sm mt-1">
// //                         Enter the quantity used and the price you actually paid.
// //                     </p>


// //                     <div className="mt-6 space-y-4">

// //                         {data.materials.map((material) => (

// //                             <div
// //                                 key={material.id}
// //                                 className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center"
// //                             >

// //                                 <div>
// //                                     <p className="font-medium">
// //                                         {material.name}
// //                                     </p>

// //                                     <p className="text-sm text-gray-500">
// //                                         Unit: {material.unit}
// //                                     </p>
// //                                 </div>


// //                                 <div>

// //                                     <label className="text-sm text-gray-600">
// //                                         Quantity
// //                                     </label>

// //                                     <input
// //                                         type="number"
// //                                         defaultValue={material.quantity}
// //                                         className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
// //                                     />

// //                                 </div>


// //                                 <div>

// //                                     <label className="text-sm text-gray-600">
// //                                         Price per {material.unit}
// //                                     </label>

// //                                     <input
// //                                         type="number"
// //                                         defaultValue={material.price}
// //                                         className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
// //                                     />

// //                                 </div>

// //                             </div>

// //                         ))}

// //                     </div>

// //                 </div>


// //                 {/* Labour */}

// //                 <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6">

// //                     <h2 className="text-xl font-semibold">
// //                         2. Labour
// //                     </h2>

// //                     <label className="block text-sm text-gray-600 mt-4">
// //                         Labour cost for this batch
// //                     </label>

// //                     <input
// //                         type="number"
// //                         placeholder="Enter labour cost"
// //                         className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
// //                     />

// //                 </div>


// //                 {/* Production */}

// //                 <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6">

// //                     <h2 className="text-xl font-semibold">
// //                         3. Production Expenses
// //                     </h2>

// //                     <p className="text-sm text-gray-500 mt-1">
// //                         Electricity, gas, fuel, machine usage, etc.
// //                     </p>

// //                     <input
// //                         type="number"
// //                         placeholder="Enter production expense"
// //                         className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-4"
// //                     />

// //                 </div>


// //                 {/* Yield */}

// //                 <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6">

// //                     <h2 className="text-xl font-semibold">
// //                         4. Finished Output
// //                     </h2>

// //                     <p className="text-sm text-gray-500 mt-1">
// //                         Enter how much finished product you actually obtained.
// //                     </p>

// //                     <input
// //                         type="number"
// //                         placeholder={`Finished output in ${data.product.unit}`}
// //                         className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-4"
// //                     />

// //                 </div>


// //                 {/* Packaging */}

// //                 <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6">

// //                     <h2 className="text-xl font-semibold">
// //                         5. Packaging
// //                     </h2>

// //                     <div className="mt-5 space-y-4">

// //                         {data.packaging.map((item) => (

// //                             <div
// //                                 key={item.id}
// //                                 className="grid grid-cols-1 md:grid-cols-2 gap-4"
// //                             >

// //                                 <div>

// //                                     <p className="font-medium">
// //                                         {item.name}
// //                                     </p>

// //                                     <p className="text-sm text-gray-500">
// //                                         Quantity: {item.quantity} {item.unit}
// //                                     </p>

// //                                 </div>


// //                                 <div>

// //                                     <label className="text-sm text-gray-600">
// //                                         Price per {item.unit}
// //                                     </label>

// //                                     <input
// //                                         type="number"
// //                                         defaultValue={item.price}
// //                                         className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
// //                                     />

// //                                 </div>

// //                             </div>

// //                         ))}

// //                     </div>

// //                 </div>


// //                 {/* Other Expenses */}

// //                 <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6">

// //                     <h2 className="text-xl font-semibold">
// //                         6. Other Expenses
// //                     </h2>

// //                     <input
// //                         type="number"
// //                         placeholder="Enter other expenses"
// //                         className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-4"
// //                     />

// //                 </div>


// //                 {/* Profit */}

// //                 <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6">

// //                     <h2 className="text-xl font-semibold">
// //                         7. Desired Profit
// //                     </h2>

// //                     <div className="flex items-center gap-3 mt-4">

// //                         <input
// //                             type="number"
// //                             defaultValue="20"
// //                             className="border border-gray-300 rounded-lg px-3 py-2"
// //                         />

// //                         <span>%</span>

// //                     </div>

// //                 </div>


// //                 <button
// //                     className="w-full bg-black text-white py-4 rounded-xl mt-8 text-lg font-semibold"
// //                 >
// //                     Calculate Cost
// //                 </button>

// //             </div>

// //         </div>
// //     )
// // }


// // export default Calculator


// import { useEffect, useState } from "react"
// import { useParams, useNavigate } from "react-router-dom"
// import { getProduct, calculateCost } from "../api"


// function Calculator() {

//     const { id } = useParams()
//     const navigate = useNavigate()

//     const [data, setData] = useState(null)
//     const [loading, setLoading] = useState(true)
//     const [error, setError] = useState("")
//     const [calculating, setCalculating] = useState(false)

//     const [materials, setMaterials] = useState([])
//     const [packaging, setPackaging] = useState([])

//     const [labour, setLabour] = useState("")
//     const [production, setProduction] = useState("")
//     const [finishedOutput, setFinishedOutput] = useState("")
//     const [otherExpense, setOtherExpense] = useState("")
//     const [profitPercent, setProfitPercent] = useState("20")


//     useEffect(() => {

//         const fetchProduct = async () => {

//             try {

//                 const result = await getProduct(id)

//                 setData(result)

//                 setMaterials(
//                     result.materials.map(material => ({
//                         ...material,
//                         quantity: material.quantity,
//                         price: material.price
//                     }))
//                 )

//                 setPackaging(
//                     result.packaging.map(item => ({
//                         ...item,
//                         quantity: item.quantity,
//                         price: item.price
//                     }))
//                 )

//             } catch (error) {

//                 setError("Unable to load product")

//             } finally {

//                 setLoading(false)

//             }
//         }

//         fetchProduct()

//     }, [id])


//     // Change material quantity or price
//     const updateMaterial = (index, field, value) => {

//         const updatedMaterials = [...materials]

//         updatedMaterials[index][field] = value

//         setMaterials(updatedMaterials)

//     }


//     // Change packaging quantity or price
//     const updatePackaging = (index, field, value) => {

//         const updatedPackaging = [...packaging]

//         updatedPackaging[index][field] = value

//         setPackaging(updatedPackaging)

//     }


//     // Calculate cost
//     const handleCalculate = async () => {

//     setError("")

//     // Check finished output
//     if (!finishedOutput || Number(finishedOutput) <= 0) {
//         setError("Please enter the finished output.")
//         return
//     }


//     // Check profit
//     if (Number(profitPercent) < 0) {
//         setError("Profit percentage cannot be negative.")
//         return
//     }


//     // Check material values
//     const invalidMaterial = materials.some(material =>
//         Number(material.quantity) < 0 ||
//         Number(material.price) < 0
//     )

//     if (invalidMaterial) {
//         setError("Material quantity and price cannot be negative.")
//         return
//     }


//     // Check packaging values
//     const invalidPackaging = packaging.some(item =>
//         Number(item.quantity) < 0 ||
//         Number(item.price) < 0
//     )

//     if (invalidPackaging) {
//         setError("Packaging quantity and price cannot be negative.")
//         return
//     }


//     // Check other expenses
//     if (Number(labour) < 0 || Number(production) < 0) {
//         setError("Labour and production expenses cannot be negative.")
//         return
//     }


//     if (Number(otherExpense) < 0) {
//         setError("Other expenses cannot be negative.")
//         return
//     }


//     try {

//         setCalculating(true)

//         const result = await calculateCost({

//             productId: Number(id),

//             materials: materials.map(material => ({
//                 id: material.id,
//                 quantity: Number(material.quantity) || 0,
//                 price: Number(material.price) || 0
//             })),

//             labour: Number(labour) || 0,

//             production: Number(production) || 0,

//             packaging: packaging.map(item => ({
//                 id: item.id,
//                 quantity: Number(item.quantity) || 0,
//                 price: Number(item.price) || 0
//             })),

//             otherExpense: Number(otherExpense) || 0,

//             finishedOutput: Number(finishedOutput),

//             profitPercent: Number(profitPercent) || 0
//         })


//         navigate("/result", {
//             state: result
//         })


//     } catch (error) {

//         setError("Unable to calculate cost")

//     } finally {

//         setCalculating(false)

//     }
// }


//     if (loading) {
//         return (
//             <div className="min-h-screen flex items-center justify-center">
//                 <p>Loading calculator...</p>
//             </div>
//         )
//     }


//     if (error && !data) {
//         return (
//             <div className="min-h-screen flex items-center justify-center">
//                 <p className="text-red-500">{error}</p>
//             </div>
//         )
//     }


//     return (
//         <div className="min-h-screen bg-gray-50 px-6 py-10">

//             <div className="max-w-4xl mx-auto">

//                 <h1 className="text-3xl font-bold text-gray-800">
//                     {data.product.name} Cost Calculator
//                 </h1>

//                 <p className="text-gray-600 mt-2">
//                     Enter the actual cost of the materials and production.
//                 </p>


//                 {/* Error */}

//                 {error && (
//                     <div className="bg-red-50 text-red-600 p-4 rounded-lg mt-6">
//                         {error}
//                     </div>
//                 )}


//                 {/* Raw Materials */}

//                 <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-8">

//                     <h2 className="text-xl font-semibold">
//                         1. Raw Materials
//                     </h2>

//                     <p className="text-gray-500 text-sm mt-1">
//                         Enter the quantity used and the price you actually paid.
//                     </p>


//                     <div className="mt-6 space-y-6">

//                         {materials.map((material, index) => (

//                             <div
//                                 key={material.id}
//                                 className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center"
//                             >

//                                 <div>
//                                     <p className="font-medium">
//                                         {material.name}
//                                     </p>

//                                     <p className="text-sm text-gray-500">
//                                         Unit: {material.unit}
//                                     </p>
//                                 </div>


//                                 <div>

//                                     <label className="text-sm text-gray-600">
//                                         Quantity
//                                     </label>

//                                     <input
//                                         type="number"
//                                         step="0.0001"
//                                         value={material.quantity}
//                                         onChange={(e) =>
//                                             updateMaterial(
//                                                 index,
//                                                 "quantity",
//                                                 e.target.value
//                                             )
//                                         }
//                                         className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
//                                     />

//                                 </div>


//                                 <div>

//                                     <label className="text-sm text-gray-600">
//                                         Price per {material.unit}
//                                     </label>

//                                     <input
//                                         type="number"
//                                         step="0.01"
//                                         value={material.price}
//                                         onChange={(e) =>
//                                             updateMaterial(
//                                                 index,
//                                                 "price",
//                                                 e.target.value
//                                             )
//                                         }
//                                         className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
//                                     />

//                                 </div>

//                             </div>

//                         ))}

//                     </div>

//                 </div>


//                 {/* Labour */}

//                 <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6">

//                     <h2 className="text-xl font-semibold">
//                         2. Labour
//                     </h2>

//                     <p className="text-sm text-gray-500 mt-1">
//                         Total labour cost for this batch.
//                     </p>

//                     <input
//                         type="number"
//                         step="0.01"
//                         value={labour}
//                         onChange={(e) => setLabour(e.target.value)}
//                         placeholder="Enter labour cost"
//                         className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-4"
//                     />

//                 </div>


//                 {/* Production */}

//                 <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6">

//                     <h2 className="text-xl font-semibold">
//                         3. Production Expenses
//                     </h2>

//                     <p className="text-sm text-gray-500 mt-1">
//                         Electricity, gas, fuel, machine usage, etc.
//                     </p>

//                     <input
//                         type="number"
//                         step="0.01"
//                         value={production}
//                         onChange={(e) => setProduction(e.target.value)}
//                         placeholder="Enter production expense"
//                         className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-4"
//                     />

//                 </div>


//                 {/* Yield */}

//                 <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6">

//                     <h2 className="text-xl font-semibold">
//                         4. Finished Output
//                     </h2>

//                     <p className="text-sm text-gray-500 mt-1">
//                         Enter how much finished product you actually obtained.
//                     </p>

//                     <input
//                         type="number"
//                         step="0.01"
//                         value={finishedOutput}
//                         onChange={(e) => setFinishedOutput(e.target.value)}
//                         placeholder={`Finished output in ${data.product.unit}`}
//                         className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-4"
//                     />

//                 </div>


//                 {/* Packaging */}

//                 <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6">

//                     <h2 className="text-xl font-semibold">
//                         5. Packaging
//                     </h2>


//                     <div className="mt-5 space-y-6">

//                         {packaging.map((item, index) => (

//                             <div
//                                 key={item.id}
//                                 className="grid grid-cols-1 md:grid-cols-2 gap-4"
//                             >

//                                 <div>

//                                     <p className="font-medium">
//                                         {item.name}
//                                     </p>

//                                     <div className="mt-2">

//     <label className="text-sm text-gray-600">
//         Quantity
//     </label>

//     <input
//         type="number"
//         step="1"
//         min="0"
//         value={item.quantity}
//         onChange={(e) =>
//             updatePackaging(
//                 index,
//                 "quantity",
//                 e.target.value
//             )
//         }
//         className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
//     />

// </div>

//                                 </div>


//                                 <div>

//                                     <label className="text-sm text-gray-600">
//                                         Price per {item.unit}
//                                     </label>

//                                     <input
//                                         type="number"
//                                         step="0.01"
//                                         value={item.price}
//                                         onChange={(e) =>
//                                             updatePackaging(
//                                                 index,
//                                                 "price",
//                                                 e.target.value
//                                             )
//                                         }
//                                         className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
//                                     />

//                                 </div>

//                             </div>

//                         ))}

//                     </div>

//                 </div>


//                 {/* Other Expenses */}

//                 <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6">

//                     <h2 className="text-xl font-semibold">
//                         6. Other Expenses
//                     </h2>

//                     <p className="text-sm text-gray-500 mt-1">
//                         Any additional cost for this batch.
//                     </p>

//                     <input
//                         type="number"
//                         step="0.01"
//                         value={otherExpense}
//                         onChange={(e) => setOtherExpense(e.target.value)}
//                         placeholder="Enter other expenses"
//                         className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-4"
//                     />

//                 </div>


//                 {/* Profit */}

//                 <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6">

//                     <h2 className="text-xl font-semibold">
//                         7. Desired Profit
//                     </h2>

//                     <p className="text-sm text-gray-500 mt-1">
//                         How much profit do you want to make?
//                     </p>

//                     <div className="flex items-center gap-3 mt-4">

//                         <input
//                             type="number"
//                             step="1"
//                             value={profitPercent}
//                             onChange={(e) =>
//                                 setProfitPercent(e.target.value)
//                             }
//                             className="border border-gray-300 rounded-lg px-3 py-2"
//                         />

//                         <span>%</span>

//                     </div>

//                 </div>


//                 {/* Calculate Button */}

//                 <button
//                     onClick={handleCalculate}
//                     disabled={calculating}
//                     className="w-full bg-black text-white py-4 rounded-xl mt-8 text-lg font-semibold disabled:opacity-50"
//                 >
//                     {calculating
//                         ? "Calculating..."
//                         : "Calculate Cost"
//                     }
//                 </button>

//             </div>

//         </div>
//     )
// }


// export default Calculator


// import { useEffect, useMemo, useState } from "react"
// import { useNavigate, useParams } from "react-router-dom"
// import { calculateCost, getProduct } from "../api"


// function Calculator() {

//     const { id } = useParams()
//     const navigate = useNavigate()

//     const [data, setData] = useState(null)
//     const [loading, setLoading] = useState(true)
//     const [error, setError] = useState("")
//     const [calculating, setCalculating] = useState(false)

//     const [materials, setMaterials] = useState([])
//     const [packaging, setPackaging] = useState([])

//     const [labour, setLabour] = useState("")
//     const [production, setProduction] = useState("")
//     const [finishedOutput, setFinishedOutput] = useState("")
//     const [otherExpense, setOtherExpense] = useState("")
//     const [profitPercent, setProfitPercent] = useState("20")


//     // Load product
//     useEffect(() => {

//         const fetchProduct = async () => {

//             try {

//                 const result = await getProduct(id)

//                 setData(result)

//                 setMaterials(
//                     result.materials.map(material => ({
//                         ...material,
//                         quantity: material.quantity,
//                         price: material.price
//                     }))
//                 )

//                 setPackaging(
//                     result.packaging.map(item => ({
//                         ...item,
//                         quantity: item.quantity,
//                         price: item.price
//                     }))
//                 )

//             } catch (error) {

//                 setError("Unable to load product")

//             } finally {

//                 setLoading(false)

//             }
//         }

//         fetchProduct()

//     }, [id])


//     // Update material
//     const updateMaterial = (index, field, value) => {

//         const updated = [...materials]

//         updated[index] = {
//             ...updated[index],
//             [field]: value
//         }

//         setMaterials(updated)
//     }


//     // Update packaging
//     const updatePackaging = (index, field, value) => {

//         const updated = [...packaging]

//         updated[index] = {
//             ...updated[index],
//             [field]: value
//         }

//         setPackaging(updated)
//     }


//     // Live raw material cost
//     const rawMaterialCost = useMemo(() => {

//         return materials.reduce((total, material) => {

//             const quantity = Number(material.quantity) || 0
//             const price = Number(material.price) || 0

//             return total + quantity * price

//         }, 0)

//     }, [materials])


//     // Live packaging cost
//     const packagingCost = useMemo(() => {

//         return packaging.reduce((total, item) => {

//             const quantity = Number(item.quantity) || 0
//             const price = Number(item.price) || 0

//             return total + quantity * price

//         }, 0)

//     }, [packaging])


//     // Live total
//     const totalCost = useMemo(() => {

//         return (
//             rawMaterialCost +
//             (Number(labour) || 0) +
//             (Number(production) || 0) +
//             packagingCost +
//             (Number(otherExpense) || 0)
//         )

//     }, [
//         rawMaterialCost,
//         labour,
//         production,
//         packagingCost,
//         otherExpense
//     ])


//     // Progress
//     const progress = useMemo(() => {

//         let completed = 0

//         if (materials.some(
//             material =>
//                 Number(material.quantity) > 0 &&
//                 Number(material.price) > 0
//         )) {
//             completed++
//         }

//         if (Number(labour) > 0) {
//             completed++
//         }

//         if (Number(production) > 0) {
//             completed++
//         }

//         if (Number(finishedOutput) > 0) {
//             completed++
//         }

//         if (packaging.some(
//             item =>
//                 Number(item.quantity) > 0 &&
//                 Number(item.price) > 0
//         )) {
//             completed++
//         }

//         if (Number(profitPercent) > 0) {
//             completed++
//         }

//         return Math.round((completed / 6) * 100)

//     }, [
//         materials,
//         labour,
//         production,
//         finishedOutput,
//         packaging,
//         profitPercent
//     ])


//     // Calculate
//     const handleCalculate = async () => {

//         setError("")


//         if (!finishedOutput || Number(finishedOutput) <= 0) {
//             setError("Please enter the finished output.")
//             return
//         }


//         if (Number(profitPercent) < 0) {
//             setError("Profit percentage cannot be negative.")
//             return
//         }


//         const invalidMaterial = materials.some(material =>
//             Number(material.quantity) < 0 ||
//             Number(material.price) < 0
//         )

//         if (invalidMaterial) {
//             setError("Material quantity and price cannot be negative.")
//             return
//         }


//         const invalidPackaging = packaging.some(item =>
//             Number(item.quantity) < 0 ||
//             Number(item.price) < 0
//         )

//         if (invalidPackaging) {
//             setError("Packaging quantity and price cannot be negative.")
//             return
//         }


//         if (
//             Number(labour) < 0 ||
//             Number(production) < 0 ||
//             Number(otherExpense) < 0
//         ) {
//             setError("Expenses cannot be negative.")
//             return
//         }


//         try {

//             setCalculating(true)

//             const result = await calculateCost({

//                 productId: Number(id),

//                 materials: materials.map(material => ({
//                     id: material.id,
//                     quantity: Number(material.quantity) || 0,
//                     price: Number(material.price) || 0
//                 })),

//                 labour: Number(labour) || 0,

//                 production: Number(production) || 0,

//                 packaging: packaging.map(item => ({
//                     id: item.id,
//                     quantity: Number(item.quantity) || 0,
//                     price: Number(item.price) || 0
//                 })),

//                 otherExpense: Number(otherExpense) || 0,

//                 finishedOutput: Number(finishedOutput),

//                 profitPercent: Number(profitPercent) || 0
//             })


//             navigate("/result", {
//                 state: result
//             })


//         } catch (error) {

//             setError("Unable to calculate cost")

//         } finally {

//             setCalculating(false)

//         }
//     }


//     if (loading) {

//         return (
//             <div className="min-h-screen flex items-center justify-center bg-slate-50">

//                 <div className="text-center">

//                     <div className="w-10 h-10 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin mx-auto" />

//                     <p className="mt-4 text-slate-500">
//                         Preparing your calculator...
//                     </p>

//                 </div>

//             </div>
//         )
//     }


//     if (error && !data) {

//         return (
//             <div className="min-h-screen flex items-center justify-center">

//                 <div className="text-center">

//                     <p className="text-red-500">
//                         {error}
//                     </p>

//                     <button
//                         onClick={() => navigate("/products")}
//                         className="mt-4 px-5 py-2 bg-slate-900 text-white rounded-lg"
//                     >
//                         Back to Products
//                     </button>

//                 </div>

//             </div>
//         )
//     }


//     return (
// <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-purple-50">


//             {/* Header */}
// <header className="bg-white/90 backdrop-blur-xl border-b border-blue-100 sticky top-0 z-30 shadow-sm">

//                 <div className="max-w-7xl mx-auto px-6 py-4">

//                     <div className="flex items-center justify-between">

//                         <button
//                             onClick={() => navigate("/products")}
//                             className="text-sm text-slate-500 hover:text-blue-600 transition"
//                         >
//                             ← Back to products
//                         </button>

//                         <div className="text-right">

//                             <p className="text-xs text-slate-400">
//                                 Costing progress
//                             </p>

//                             <p className="text-sm font-semibold text-slate-700">
//                                 {progress}% complete
//                             </p>

//                         </div>

//                     </div>


//                     {/* Progress bar */}

// <div className="h-3 bg-slate-100 rounded-full mt-4 overflow-hidden shadow-inner">

//                         <div
//     className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full progress-bar shadow-sm"
//     style={{ width: `${progress}%` }}
// />

//                     </div>

//                 </div>

//             </header>


//             <main className="max-w-7xl mx-auto px-6 py-10">


//                 {/* Page heading */}

//                 <div className="max-w-4xl">

//                     <div className="flex items-start gap-4">
// <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center text-3xl shadow-lg shadow-blue-200">
                       
//                             {data.product.category === "Food"
//                                 ? "🍲"
//                                 : data.product.category === "Cleaning"
//                                     ? "🧴"
//                                     : "🪔"
//                             }
//                         </div>


//                         <div>

//                         <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
//                                 Production Cost Calculator
//                             </p>

//                           <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 mt-1">
//                                 {data.product.name}
//                             </h1>

//                             <p className="text-slate-500 mt-2">
//                                 Enter what you actually spend to make this product.
//                             </p>

//                         </div>

//                     </div>

//                 </div>


//                 {/* Main layout */}

//                 <div className="grid lg:grid-cols-[1fr_320px] gap-8 mt-10">


//                     <div>


//                         {/* Error */}

//                         {error && (

//                             <div className="mb-6 flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl p-4">

//                                 <span>⚠️</span>

//                                 <p className="text-sm">
//                                     {error}
//                                 </p>

//                             </div>

//                         )}


//                         {/* Materials */}

//                         <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

//                             <div className="p-6 border-b border-slate-100">

//                                 <div className="flex items-center gap-3">

//                                     <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
//                                         1
//                                     </div>

//                                     <div>

//                                         <h2 className="text-xl font-bold text-slate-900">
//                                             Raw Materials
//                                         </h2>

//                                         <p className="text-sm text-slate-500">
//                                             Enter the quantity you use and what you pay.
//                                         </p>

//                                     </div>

//                                 </div>

//                             </div>


//                             <div className="p-6 space-y-5">

//                                 {materials.map((material, index) => {

//                                     const materialCost =
//                                         (Number(material.quantity) || 0) *
//                                         (Number(material.price) || 0)

//                                     return (

//                                      <div
//                                        key={material.id}
//                                       className="cost-card rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50/40 border border-slate-200 p-5"
//                                         >
//                                             <div className="flex justify-between items-center mb-4">

//                                                 <div>

//                                                     <p className="font-semibold text-slate-900">
//                                                         {material.name}
//                                                     </p>

//                                                     <p className="text-xs text-slate-500 mt-1">
//                                                         Cost = quantity × price
//                                                     </p>

//                                                 </div>

//                                                 <span className="bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full text-sm font-extrabold">
//                                                    ₹{materialCost.toFixed(2)}
//                                                       </span>
                                               

//                                             </div>


//                                             <div className="grid grid-cols-2 gap-4">

//                                                 <div>

//                                                     <label className="text-xs font-medium text-slate-500">
//                                                         Quantity
//                                                     </label>

//                                                     <div className="relative">

//                                                         <input
//                                                             type="number"
//                                                             min="0"
//                                                             step="0.0001"
//                                                             value={material.quantity}
//                                                             onChange={(e) =>
//                                                                 updateMaterial(
//                                                                     index,
//                                                                     "quantity",
//                                                                     e.target.value
//                                                                 )
//                                                             }
//                                                             className="w-full mt-1 border border-slate-200 rounded-xl px-3 py-3 pr-16 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//                                                         />

//                                                         <span className="absolute right-3 top-1/2 translate-y-1 text-xs text-slate-400">
//                                                             {material.unit}
//                                                         </span>

//                                                     </div>

//                                                 </div>


//                                                 <div>

//                                                     <label className="text-xs font-medium text-slate-500">
//                                                         Price
//                                                     </label>

//                                                     <div className="relative">

//                                                         <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
//                                                             ₹
//                                                         </span>

//                                                         <input
//                                                             type="number"
//                                                             min="0"
//                                                             step="0.01"
//                                                             value={material.price}
//                                                             onChange={(e) =>
//                                                                 updateMaterial(
//                                                                     index,
//                                                                     "price",
//                                                                     e.target.value
//                                                                 )
//                                                             }
//                                                             className="w-full mt-1 border border-slate-200 rounded-xl px-8 py-3 pr-14 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//                                                         />

//                                                         <span className="absolute right-3 top-1/2 translate-y-1 text-xs text-slate-400">
//                                                             /{material.unit}
//                                                         </span>

//                                                     </div>

//                                                 </div>

//                                             </div>

//                                         </div>

//                                     )

//                                 })}

//                             </div>

//                         </section>


//                         {/* Labour */}

//                         <section className="bg-white rounded-2xl border border-slate-200 shadow-sm mt-6 p-6">

//                             <div className="flex items-center gap-3">

//                                 <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
//                                     2
//                                 </div>

//                                 <div>

//                                     <h2 className="text-xl font-bold text-slate-900">
//                                         Labour
//                                     </h2>

//                                     <p className="text-sm text-slate-500">
//                                         Include the cost of people working on this batch.
//                                     </p>

//                                 </div>

//                             </div>


//                             <div className="mt-6">

//                                 <label className="text-sm font-medium text-slate-600">
//                                     Labour cost for this batch
//                                 </label>

//                                 <div className="relative mt-2">

//                                     <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
//                                         ₹
//                                     </span>

//                                     <input
//                                         type="number"
//                                         min="0"
//                                         step="0.01"
//                                         value={labour}
//                                         onChange={(e) => setLabour(e.target.value)}
//                                         placeholder="0"
//                                         className="w-full border border-slate-200 rounded-xl px-9 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition"
//                                     />

//                                 </div>

//                             </div>

//                         </section>


//                         {/* Production */}

//                         <section className="bg-white rounded-2xl border border-slate-200 shadow-sm mt-6 p-6">

//                             <div className="flex items-center gap-3">

//                                 <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
//                                     3
//                                 </div>

//                                 <div>

//                                     <h2 className="text-xl font-bold text-slate-900">
//                                         Production Expenses
//                                     </h2>

//                                     <p className="text-sm text-slate-500">
//                                         Electricity, gas, fuel, machine usage, etc.
//                                     </p>

//                                 </div>

//                             </div>


//                             <div className="mt-6">

//                                 <label className="text-sm font-medium text-slate-600">
//                                     Production expense for this batch
//                                 </label>

//                                 <div className="relative mt-2">

//                                     <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
//                                         ₹
//                                     </span>

//                                     <input
//                                         type="number"
//                                         min="0"
//                                         step="0.01"
//                                         value={production}
//                                         onChange={(e) => setProduction(e.target.value)}
//                                         placeholder="0"
//                                         className="w-full border border-slate-200 rounded-xl px-9 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition"
//                                     />

//                                 </div>

//                             </div>

//                         </section>


//                         {/* Output */}

//                         <section className="bg-white rounded-2xl border border-slate-200 shadow-sm mt-6 p-6">

//                             <div className="flex items-center gap-3">

//                                 <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
//                                     4
//                                 </div>

//                                 <div>

//                                     <h2 className="text-xl font-bold text-slate-900">
//                                         Finished Output
//                                     </h2>

//                                     <p className="text-sm text-slate-500">
//                                         How much finished product did you actually get?
//                                     </p>

//                                 </div>

//                             </div>


//                             <div className="mt-6">

//                                 <label className="text-sm font-medium text-slate-600">
//                                     Actual finished output
//                                 </label>

//                                 <div className="relative mt-2">

//                                     <input
//                                         type="number"
//                                         min="0"
//                                         step="0.01"
//                                         value={finishedOutput}
//                                         onChange={(e) => setFinishedOutput(e.target.value)}
//                                         placeholder="0"
//                                         className="w-full border border-slate-200 rounded-xl px-4 py-3 pr-20 outline-none focus:ring-2 focus:ring-blue-500 transition"
//                                     />

//                                     <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
//                                         {data.product.unit}
//                                     </span>

//                                 </div>


//                                 <div className="mt-3 bg-blue-50 text-blue-700 rounded-xl p-3 text-sm">
//                                     💡 Use the actual amount you got after processing, cooling, drying or losses.
//                                 </div>

//                             </div>

//                         </section>


//                         {/* Packaging */}

//                         <section className="bg-white rounded-2xl border border-slate-200 shadow-sm mt-6 overflow-hidden">

//                             <div className="p-6 border-b border-slate-100">

//                                 <div className="flex items-center gap-3">

//                                     <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
//                                         5
//                                     </div>

//                                     <div>

//                                         <h2 className="text-xl font-bold text-slate-900">
//                                             Packaging
//                                         </h2>

//                                         <p className="text-sm text-slate-500">
//                                             Enter how much packaging you actually used.
//                                         </p>

//                                     </div>

//                                 </div>

//                             </div>


//                             <div className="p-6 space-y-5">

//                                 {packaging.map((item, index) => {

//                                     const itemCost =
//                                         (Number(item.quantity) || 0) *
//                                         (Number(item.price) || 0)

//                                     return (

//                                         <div
//                                             key={item.id}
//                                             className="rounded-xl bg-slate-50 border border-slate-100 p-4"
//                                         >

//                                             <div className="flex justify-between mb-4">

//                                                 <div>

//                                                     <p className="font-semibold text-slate-900">
//                                                         {item.name}
//                                                     </p>

//                                                     <p className="text-xs text-slate-500 mt-1">
//                                                         Cost = quantity × price
//                                                     </p>

//                                                 </div>

//                                                 <span className="font-semibold text-slate-700">
//                                                     ₹{itemCost.toFixed(2)}
//                                                 </span>

//                                             </div>


//                                             <div className="grid grid-cols-2 gap-4">

//                                                 <div>

//                                                     <label className="text-xs font-medium text-slate-500">
//                                                         Quantity
//                                                     </label>

//                                                     <input
//                                                         type="number"
//                                                         min="0"
//                                                         step="1"
//                                                         value={item.quantity}
//                                                         onChange={(e) =>
//                                                             updatePackaging(
//                                                                 index,
//                                                                 "quantity",
//                                                                 e.target.value
//                                                             )
//                                                         }
//                                                         className="w-full mt-1 border border-slate-200 rounded-xl px-3 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition"
//                                                     />

//                                                 </div>


//                                                 <div>

//                                                     <label className="text-xs font-medium text-slate-500">
//                                                         Price / {item.unit}
//                                                     </label>

//                                                     <div className="relative">

//                                                         <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
//                                                             ₹
//                                                         </span>

//                                                         <input
//                                                             type="number"
//                                                             min="0"
//                                                             step="0.01"
//                                                             value={item.price}
//                                                             onChange={(e) =>
//                                                                 updatePackaging(
//                                                                     index,
//                                                                     "price",
//                                                                     e.target.value
//                                                                 )
//                                                             }
//                                                             className="w-full mt-1 border border-slate-200 rounded-xl px-8 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition"
//                                                         />

//                                                     </div>

//                                                 </div>

//                                             </div>

//                                         </div>

//                                     )

//                                 })}

//                             </div>

//                         </section>


//                         {/* Other */}

//                        <section className="cost-card bg-white/95 backdrop-blur rounded-3xl border border-slate-200 shadow-sm overflow-hidden">

//                             <div className="flex items-center gap-3">

//                                 <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
//                                     6
//                                 </div>

//                                 <div>

//                                     <h2 className="text-xl font-bold text-slate-900">
//                                         Other Expenses
//                                     </h2>

//                                     <p className="text-sm text-slate-500">
//                                         Add any other cost related to this batch.
//                                     </p>

//                                 </div>

//                             </div>


//                             <div className="mt-6">

//                                 <div className="relative">

//                                     <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
//                                         ₹
//                                     </span>

//                                     <input
//                                         type="number"
//                                         min="0"
//                                         step="0.01"
//                                         value={otherExpense}
//                                         onChange={(e) => setOtherExpense(e.target.value)}
//                                         placeholder="0"
//                                         className="w-full border border-slate-200 rounded-xl px-9 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition"
//                                     />

//                                 </div>

//                             </div>

//                         </section>


//                         {/* Profit */}

//              <section className="cost-card bg-white/95 backdrop-blur rounded-3xl border border-slate-200 shadow-sm mt-6 p-6">

//                             <div className="flex items-center gap-3">

//                                 <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
//                                     7
//                                 </div>

//                                 <div>

//                                    <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">
//                                         Desired Profit
//                                     </h2>

//                                     <p className="text-sm font-medium text-slate-500 leading-6">
//                                         Choose the profit you want to earn.
//                                     </p>

//                                 </div>

//                             </div>


//                             <div className="mt-6">

//                                 <div className="flex gap-2 flex-wrap">

//                                     {[10, 15, 20, 25, 30].map(value => (

//                                         <button
//                                             key={value}
//                                             onClick={() => setProfitPercent(String(value))}
//                                            className={`px-6 py-3 rounded-xl border-2 text-sm font-extrabold transition-all duration-200 ${
//                                                 Number(profitPercent) === value
//                                                     ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-200"
//                                                     : "bg-white text-slate-600 border-slate-200 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50"
//                                             }`}
//                                         >
//                                             {value}%
//                                         </button>

//                                     ))}

//                                 </div>


//                                 <div className="relative mt-4 max-w-xs">

//                                     <input
//                                         type="number"
//                                         min="0"
//                                         step="1"
//                                         value={profitPercent}
//                                         onChange={(e) => setProfitPercent(e.target.value)}
//                                         className="w-full border border-slate-200 rounded-xl px-4 py-3 pr-10 outline-none focus:ring-2 focus:ring-blue-500"
//                                     />

//                                     <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
//                                         %
//                                     </span>

//                                 </div>

//                             </div>

//                         </section>


//                         {/* Mobile calculate button */}

//                         <button
//                             onClick={handleCalculate}
//                             disabled={calculating}
//                             className="lg:hidden w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold text-lg shadow-lg transition disabled:opacity-50"
//                         >
//                             {calculating
//                                 ? "Calculating..."
//                                 : "Calculate My Cost →"
//                             }
//                         </button>

//                     </div>


//                     {/* Sticky summary */}

//                     <aside>

//                         <div className="lg:sticky lg:top-28">

//                            <div className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 text-white rounded-3xl p-7 shadow-2xl shadow-blue-200">

//                               <p className="text-xs font-bold tracking-[0.2em] text-blue-300">
//     COST SO FAR
// </p>


//                                 <div className="mt-2">
//                                   <span className="text-5xl font-extrabold tracking-tight">
//     ₹{totalCost.toFixed(2)}
// </span>

//                                 </div>


//                                <p className="text-sm font-medium text-blue-200 mt-2">
//     Current batch cost
// </p>


//                                 <div className="border-t border-slate-700 my-6" />


//                                 <div className="space-y-4 text-sm">

//                                     <div className="flex justify-between">
//                                         <span className="text-slate-400">
//                                             Materials
//                                         </span>

//                                         <span>
//                                             ₹{rawMaterialCost.toFixed(2)}
//                                         </span>
//                                     </div>


//                                     <div className="flex justify-between">
//                                         <span className="text-slate-400">
//                                             Labour
//                                         </span>

//                                         <span>
//                                             ₹{(Number(labour) || 0).toFixed(2)}
//                                         </span>
//                                     </div>


//                                     <div className="flex justify-between">
//                                         <span className="text-slate-400">
//                                             Production
//                                         </span>

//                                         <span>
//                                             ₹{(Number(production) || 0).toFixed(2)}
//                                         </span>
//                                     </div>


//                                     <div className="flex justify-between">
//                                         <span className="text-slate-400">
//                                             Packaging
//                                         </span>

//                                         <span>
//                                             ₹{packagingCost.toFixed(2)}
//                                         </span>
//                                     </div>


//                                     <div className="flex justify-between">
//                                         <span className="text-slate-400">
//                                             Other
//                                         </span>

//                                         <span>
//                                             ₹{(Number(otherExpense) || 0).toFixed(2)}
//                                         </span>
//                                     </div>

//                                 </div>


//                                 <button
//                                     onClick={handleCalculate}
//                                     disabled={calculating}
//                                     className="lg:hidden w-full mt-6 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-purple-600 text-white py-4 rounded-2xl font-extrabold text-lg shadow-lg shadow-blue-200 transition-all duration-300 disabled:opacity-50"
//                                 >
//                                     {calculating
//                                         ? "Calculating..."
//                                         : "Calculate My Cost →"
//                                     }
//                                 </button>

//                             </div>


//                             {/* Educational card */}

//                          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-3xl p-6 mt-5 shadow-sm">

//                                 <div className="text-xl">
//                                     💡
//                                 </div>

//                                <h3 className="font-extrabold text-blue-950 mt-3 text-lg">
//                                     Why enter actual output?
//                                 </h3>
// <p className="text-sm font-medium text-blue-800 mt-2 leading-6">
//                                     Ingredients may weigh more before processing
//                                     than the final product. Using your actual
//                                     finished output gives you a more realistic
//                                     cost per {data.product.unit}.
//                                 </p>

//                             </div>

//                         </div>

//                     </aside>

//                 </div>

//             </main>

//         </div>
//     )
// }


// export default Calculator


import { useEffect, useMemo, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { calculateCost, getProduct } from "../api"


function Calculator() {

    const { id } = useParams()
    const navigate = useNavigate()

    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [calculating, setCalculating] = useState(false)

    const [materials, setMaterials] = useState([])
    const [packaging, setPackaging] = useState([])

    const [labour, setLabour] = useState("")
    const [production, setProduction] = useState("")
    const [finishedOutput, setFinishedOutput] = useState("")
    const [otherExpense, setOtherExpense] = useState("")
    const [profitPercent, setProfitPercent] = useState("20")


    // Load product
    useEffect(() => {

        const fetchProduct = async () => {

            try {

                const result = await getProduct(id)

                setData(result)

                setMaterials(
                    result.materials.map(material => ({
                        ...material,
                        quantity: material.quantity,
                        price: material.price
                    }))
                )

                setPackaging(
                    result.packaging.map(item => ({
                        ...item,
                        quantity: item.quantity,
                        price: item.price
                    }))
                )

            } catch (error) {

                setError("Unable to load product")

            } finally {

                setLoading(false)

            }
        }

        fetchProduct()

    }, [id])


    // Update material
    const updateMaterial = (index, field, value) => {

        const updated = [...materials]

        updated[index] = {
            ...updated[index],
            [field]: value
        }

        setMaterials(updated)
    }


    // Update packaging
    const updatePackaging = (index, field, value) => {

        const updated = [...packaging]

        updated[index] = {
            ...updated[index],
            [field]: value
        }

        setPackaging(updated)
    }


    // Live raw material cost
    const rawMaterialCost = useMemo(() => {

        return materials.reduce((total, material) => {

            const quantity = Number(material.quantity) || 0
            const price = Number(material.price) || 0

            return total + quantity * price

        }, 0)

    }, [materials])


    // Live packaging cost
    const packagingCost = useMemo(() => {

        return packaging.reduce((total, item) => {

            const quantity = Number(item.quantity) || 0
            const price = Number(item.price) || 0

            return total + quantity * price

        }, 0)

    }, [packaging])


    // Live total
    const totalCost = useMemo(() => {

        return (
            rawMaterialCost +
            (Number(labour) || 0) +
            (Number(production) || 0) +
            packagingCost +
            (Number(otherExpense) || 0)
        )

    }, [
        rawMaterialCost,
        labour,
        production,
        packagingCost,
        otherExpense
    ])


    // Progress
    const progress = useMemo(() => {

        let completed = 0

        if (materials.some(
            material =>
                Number(material.quantity) > 0 &&
                Number(material.price) > 0
        )) {
            completed++
        }

        if (Number(labour) > 0) {
            completed++
        }

        if (Number(production) > 0) {
            completed++
        }

        if (Number(finishedOutput) > 0) {
            completed++
        }

        if (packaging.some(
            item =>
                Number(item.quantity) > 0 &&
                Number(item.price) > 0
        )) {
            completed++
        }

        if (Number(profitPercent) > 0) {
            completed++
        }

        return Math.round((completed / 6) * 100)

    }, [
        materials,
        labour,
        production,
        finishedOutput,
        packaging,
        profitPercent
    ])


    // Calculate
    const handleCalculate = async () => {

        setError("")


        if (!finishedOutput || Number(finishedOutput) <= 0) {
            setError("Please enter the finished output.")
            return
        }


        if (Number(profitPercent) < 0) {
            setError("Profit percentage cannot be negative.")
            return
        }


        const invalidMaterial = materials.some(material =>
            Number(material.quantity) < 0 ||
            Number(material.price) < 0
        )

        if (invalidMaterial) {
            setError("Material quantity and price cannot be negative.")
            return
        }


        const invalidPackaging = packaging.some(item =>
            Number(item.quantity) < 0 ||
            Number(item.price) < 0
        )

        if (invalidPackaging) {
            setError("Packaging quantity and price cannot be negative.")
            return
        }


        if (
            Number(labour) < 0 ||
            Number(production) < 0 ||
            Number(otherExpense) < 0
        ) {
            setError("Expenses cannot be negative.")
            return
        }


        try {

            setCalculating(true)

            const result = await calculateCost({

                productId: Number(id),

                materials: materials.map(material => ({
                    id: material.id,
                    quantity: Number(material.quantity) || 0,
                    price: Number(material.price) || 0
                })),

                labour: Number(labour) || 0,

                production: Number(production) || 0,

                packaging: packaging.map(item => ({
                    id: item.id,
                    quantity: Number(item.quantity) || 0,
                    price: Number(item.price) || 0
                })),

                otherExpense: Number(otherExpense) || 0,

                finishedOutput: Number(finishedOutput),

                profitPercent: Number(profitPercent) || 0
            })


            navigate("/result", {
                state: result
            })


        } catch (error) {

            setError("Unable to calculate cost")

        } finally {

            setCalculating(false)

        }
    }


    if (loading) {

        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">

                <div className="text-center">

                    <div className="w-10 h-10 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin mx-auto" />

                    <p className="mt-4 text-slate-500">
                        Preparing your calculator...
                    </p>

                </div>

            </div>
        )
    }


    if (error && !data) {

        return (
            <div className="min-h-screen flex items-center justify-center">

                <div className="text-center">

                    <p className="text-red-500">
                        {error}
                    </p>

                    <button
                        onClick={() => navigate("/products")}
                        className="mt-4 px-5 py-2 bg-slate-900 text-white rounded-lg"
                    >
                        Back to Products
                    </button>

                </div>

            </div>
        )
    }


    return (
<div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-purple-50">


            {/* Header */}
<header className="bg-white/90 backdrop-blur-xl border-b border-blue-100 sticky top-0 z-30 shadow-sm">

                <div className="max-w-7xl mx-auto px-6 py-4">

                    <div className="flex items-center justify-between">

                        <button
                            onClick={() => navigate("/products")}
                            className="text-sm text-slate-500 hover:text-blue-600 transition"
                        >
                            ← Back to products
                        </button>

                        <div className="text-right">

                            <p className="text-xs text-slate-400">
                                Costing progress
                            </p>

                            <p className="text-sm font-semibold text-slate-700">
                                {progress}% complete
                            </p>

                        </div>

                    </div>


                    {/* Progress bar */}

<div className="h-3 bg-slate-100 rounded-full mt-4 overflow-hidden shadow-inner">

                        <div
    className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full progress-bar shadow-sm"
    style={{ width: `${progress}%` }}
/>

                    </div>

                </div>

            </header>


            <main className="max-w-7xl mx-auto px-6 py-10">


                {/* Page heading */}

                <div className="max-w-4xl">

                    <div className="flex items-start gap-4">
<div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center text-3xl shadow-lg shadow-blue-200">
                       
                            {data.product.category === "Food"
                                ? "🍲"
                                : data.product.category === "Cleaning"
                                    ? "🧴"
                                    : "🪔"
                            }
                        </div>


                        <div>

                        <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
                                Production Cost Calculator
                            </p>

                          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 mt-1">
                                {data.product.name}
                            </h1>

                            <p className="text-slate-500 mt-2">
                                Enter what you actually spend to make this product.
                            </p>

                        </div>

                    </div>

                </div>


                {/* Main layout */}

                <div className="grid lg:grid-cols-[1fr_320px] gap-8 mt-10">


                    <div>


                        {/* Error */}

                        {error && (

                            <div className="mb-6 flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl p-4">

                                <span>⚠️</span>

                                <p className="text-sm">
                                    {error}
                                </p>

                            </div>

                        )}


                        {/* Materials */}

                        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

                            <div className="p-6 border-b border-slate-100">

                                <div className="flex items-center gap-3">

                                    <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                                        1
                                    </div>

                                    <div>

                                        <h2 className="text-xl font-bold text-slate-900">
                                            Raw Materials
                                        </h2>

                                        <p className="text-sm text-slate-500">
                                            Enter the quantity you use and what you pay.
                                        </p>

                                    </div>

                                </div>

                            </div>


                            <div className="p-6 space-y-5">

                                {materials.map((material, index) => {

                                    const materialCost =
                                        (Number(material.quantity) || 0) *
                                        (Number(material.price) || 0)

                                    return (

                                     <div
                                       key={material.id}
                                      className="cost-card rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50/40 border border-slate-200 p-5"
                                        >
                                            <div className="flex justify-between items-center mb-4">

                                                <div>

                                                    <p className="font-semibold text-slate-900">
                                                        {material.name}
                                                    </p>

                                                    <p className="text-xs text-slate-500 mt-1">
                                                        Cost = quantity × price
                                                    </p>

                                                </div>

                                                <span className="bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full text-sm font-extrabold">
                                                   ₹{materialCost.toFixed(2)}
                                                      </span>
                                               

                                            </div>


                                            <div className="grid grid-cols-2 gap-4">

                                                <div>

                                                    <label className="text-xs font-medium text-slate-500">
                                                        Quantity
                                                    </label>

                                                    <div className="relative">

                                                        <input
                                                            type="number"
                                                            min="0"
                                                            step="0.0001"
                                                            value={material.quantity}
                                                            onChange={(e) =>
                                                                updateMaterial(
                                                                    index,
                                                                    "quantity",
                                                                    e.target.value
                                                                )
                                                            }
                                                            className="w-full mt-1 border border-slate-200 rounded-xl px-3 py-3 pr-16 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                                        />

                                                        <span className="absolute right-3 top-1/2 translate-y-1 text-xs text-slate-400">
                                                            {material.unit}
                                                        </span>

                                                    </div>

                                                </div>


                                                <div>

                                                    <label className="text-xs font-medium text-slate-500">
                                                        Price
                                                    </label>

                                                    <div className="relative">

                                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                                            ₹
                                                        </span>

                                                        <input
                                                            type="number"
                                                            min="0"
                                                            step="0.01"
                                                            value={material.price}
                                                            onChange={(e) =>
                                                                updateMaterial(
                                                                    index,
                                                                    "price",
                                                                    e.target.value
                                                                )
                                                            }
                                                            className="w-full mt-1 border border-slate-200 rounded-xl px-8 py-3 pr-14 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                                        />

                                                        <span className="absolute right-3 top-1/2 translate-y-1 text-xs text-slate-400">
                                                            /{material.unit}
                                                        </span>

                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                    )

                                })}

                            </div>

                        </section>


                        {/* Labour */}

                        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm mt-6 p-6">

                            <div className="flex items-center gap-3">

                                <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                                    2
                                </div>

                                <div>

                                    <h2 className="text-xl font-bold text-slate-900">
                                        Labour
                                    </h2>

                                    <p className="text-sm text-slate-500">
                                        Include the cost of people working on this batch.
                                    </p>

                                </div>

                            </div>


                            <div className="mt-6">

                                <label className="text-sm font-medium text-slate-600">
                                    Labour cost for this batch
                                </label>

                                <div className="relative mt-2">

                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                        ₹
                                    </span>

                                    <input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={labour}
                                        onChange={(e) => setLabour(e.target.value)}
                                        placeholder="0"
                                        className="w-full border border-slate-200 rounded-xl px-9 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition"
                                    />

                                </div>

                            </div>

                        </section>


                        {/* Production */}

                        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm mt-6 p-6">

                            <div className="flex items-center gap-3">

                                <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                                    3
                                </div>

                                <div>

                                    <h2 className="text-xl font-bold text-slate-900">
                                        Production Expenses
                                    </h2>

                                    <p className="text-sm text-slate-500">
                                        Electricity, gas, fuel, machine usage, etc.
                                    </p>

                                </div>

                            </div>


                            <div className="mt-6">

                                <label className="text-sm font-medium text-slate-600">
                                    Production expense for this batch
                                </label>

                                <div className="relative mt-2">

                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                        ₹
                                    </span>

                                    <input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={production}
                                        onChange={(e) => setProduction(e.target.value)}
                                        placeholder="0"
                                        className="w-full border border-slate-200 rounded-xl px-9 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition"
                                    />

                                </div>

                            </div>

                        </section>


                        {/* Output */}

                        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm mt-6 p-6">

                            <div className="flex items-center gap-3">

                                <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                                    4
                                </div>

                                <div>

                                    <h2 className="text-xl font-bold text-slate-900">
                                        Finished Output
                                    </h2>

                                    <p className="text-sm text-slate-500">
                                        How much finished product did you actually get?
                                    </p>

                                </div>

                            </div>


                            <div className="mt-6">

                                <label className="text-sm font-medium text-slate-600">
                                    Actual finished output
                                </label>

                                <div className="relative mt-2">

                                    <input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={finishedOutput}
                                        onChange={(e) => setFinishedOutput(e.target.value)}
                                        placeholder="0"
                                        className="w-full border border-slate-200 rounded-xl px-4 py-3 pr-20 outline-none focus:ring-2 focus:ring-blue-500 transition"
                                    />

                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                                        {data.product.unit}
                                    </span>

                                </div>


                                <div className="mt-3 bg-blue-50 text-blue-700 rounded-xl p-3 text-sm">
                                    💡 Use the actual amount you got after processing, cooling, drying or losses.
                                </div>

                            </div>

                        </section>


                        {/* Packaging */}

                        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm mt-6 overflow-hidden">

                            <div className="p-6 border-b border-slate-100">

                                <div className="flex items-center gap-3">

                                    <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                                        5
                                    </div>

                                    <div>

                                        <h2 className="text-xl font-bold text-slate-900">
                                            Packaging
                                        </h2>

                                        <p className="text-sm text-slate-500">
                                            Enter how much packaging you actually used.
                                        </p>

                                    </div>

                                </div>

                            </div>


                            <div className="p-6 space-y-5">

                                {packaging.map((item, index) => {

                                    const itemCost =
                                        (Number(item.quantity) || 0) *
                                        (Number(item.price) || 0)

                                    return (

                                        <div
                                            key={item.id}
                                            className="rounded-xl bg-slate-50 border border-slate-100 p-4"
                                        >

                                            <div className="flex justify-between mb-4">

                                                <div>

                                                    <p className="font-semibold text-slate-900">
                                                        {item.name}
                                                    </p>

                                                    <p className="text-xs text-slate-500 mt-1">
                                                        Cost = quantity × price
                                                    </p>

                                                </div>

                                                <span className="font-semibold text-slate-700">
                                                    ₹{itemCost.toFixed(2)}
                                                </span>

                                            </div>


                                            <div className="grid grid-cols-2 gap-4">

                                                <div>

                                                    <label className="text-xs font-medium text-slate-500">
                                                        Quantity
                                                    </label>

                                                    <input
                                                        type="number"
                                                        min="0"
                                                        step="1"
                                                        value={item.quantity}
                                                        onChange={(e) =>
                                                            updatePackaging(
                                                                index,
                                                                "quantity",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="w-full mt-1 border border-slate-200 rounded-xl px-3 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition"
                                                    />

                                                </div>


                                                <div>

                                                    <label className="text-xs font-medium text-slate-500">
                                                        Price / {item.unit}
                                                    </label>

                                                    <div className="relative">

                                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                                            ₹
                                                        </span>

                                                        <input
                                                            type="number"
                                                            min="0"
                                                            step="0.01"
                                                            value={item.price}
                                                            onChange={(e) =>
                                                                updatePackaging(
                                                                    index,
                                                                    "price",
                                                                    e.target.value
                                                                )
                                                            }
                                                            className="w-full mt-1 border border-slate-200 rounded-xl px-8 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition"
                                                        />

                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                    )

                                })}

                            </div>

                        </section>


                        {/* Other */}

                       <section className="cost-card bg-white/95 backdrop-blur rounded-3xl border border-slate-200 shadow-sm overflow-hidden">

                            <div className="flex items-center gap-3">

                                <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                                    6
                                </div>

                                <div>

                                    <h2 className="text-xl font-bold text-slate-900">
                                        Other Expenses
                                    </h2>

                                    <p className="text-sm text-slate-500">
                                        Add any other cost related to this batch.
                                    </p>

                                </div>

                            </div>


                            <div className="mt-6">

                                <div className="relative">

                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                        ₹
                                    </span>

                                    <input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={otherExpense}
                                        onChange={(e) => setOtherExpense(e.target.value)}
                                        placeholder="0"
                                        className="w-full border border-slate-200 rounded-xl px-9 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition"
                                    />

                                </div>

                            </div>

                        </section>


                        {/* Profit */}

             <section className="cost-card bg-white/95 backdrop-blur rounded-3xl border border-slate-200 shadow-sm mt-6 p-6">

                            <div className="flex items-center gap-3">

                                <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                                    7
                                </div>

                                <div>

                                   <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">
                                        Desired Profit
                                    </h2>

                                    <p className="text-sm font-medium text-slate-500 leading-6">
                                        Choose the profit you want to earn.
                                    </p>

                                </div>

                            </div>


                            <div className="mt-6">

                                <div className="flex gap-2 flex-wrap">

                                    {[10, 15, 20, 25, 30].map(value => (

                                        <button
                                            key={value}
                                            onClick={() => setProfitPercent(String(value))}
                                           className={`px-6 py-3 rounded-xl border-2 text-sm font-extrabold transition-all duration-200 ${
                                                Number(profitPercent) === value
                                                    ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-200"
                                                    : "bg-white text-slate-600 border-slate-200 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50"
                                            }`}
                                        >
                                            {value}%
                                        </button>

                                    ))}

                                </div>


                                <div className="relative mt-4 max-w-xs">

                                    <input
                                        type="number"
                                        min="0"
                                        step="1"
                                        value={profitPercent}
                                        onChange={(e) => setProfitPercent(e.target.value)}
                                        className="w-full border border-slate-200 rounded-xl px-4 py-3 pr-10 outline-none focus:ring-2 focus:ring-blue-500"
                                    />

                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                                        %
                                    </span>

                                </div>

                            </div>

                        </section>


                        {/* Calculate button */}

                        <button
                            onClick={handleCalculate}
                            disabled={calculating}
                            className="w-full mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 rounded-2xl font-extrabold text-lg shadow-lg shadow-blue-200 transition-all duration-300 disabled:opacity-50"
                        >
                            {calculating
                                ? "Calculating..."
                                : "Calculate My Cost →"
                            }
                        </button>

                    </div>


                    {/* Sticky summary */}

                    <aside>

                        <div className="lg:sticky lg:top-28">

                           <div className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 text-white rounded-3xl p-7 shadow-2xl shadow-blue-200">

                              <p className="text-xs font-bold tracking-[0.2em] text-blue-300">
    COST SO FAR
</p>


                                <div className="mt-2">
                                  <span className="text-5xl font-extrabold tracking-tight">
    ₹{totalCost.toFixed(2)}
</span>

                                </div>


                               <p className="text-sm font-medium text-blue-200 mt-2">
    Current batch cost
</p>


                                <div className="border-t border-slate-700 my-6" />


                                <div className="space-y-4 text-sm">

                                    <div className="flex justify-between">
                                        <span className="text-slate-400">
                                            Materials
                                        </span>

                                        <span>
                                            ₹{rawMaterialCost.toFixed(2)}
                                        </span>
                                    </div>


                                    <div className="flex justify-between">
                                        <span className="text-slate-400">
                                            Labour
                                        </span>

                                        <span>
                                            ₹{(Number(labour) || 0).toFixed(2)}
                                        </span>
                                    </div>


                                    <div className="flex justify-between">
                                        <span className="text-slate-400">
                                            Production
                                        </span>

                                        <span>
                                            ₹{(Number(production) || 0).toFixed(2)}
                                        </span>
                                    </div>


                                    <div className="flex justify-between">
                                        <span className="text-slate-400">
                                            Packaging
                                        </span>

                                        <span>
                                            ₹{packagingCost.toFixed(2)}
                                        </span>
                                    </div>


                                    <div className="flex justify-between">
                                        <span className="text-slate-400">
                                            Other
                                        </span>

                                        <span>
                                            ₹{(Number(otherExpense) || 0).toFixed(2)}
                                        </span>
                                    </div>

                                </div>




                            </div>


                            {/* Educational card */}

                         <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-3xl p-6 mt-5 shadow-sm">

                                <div className="text-xl">
                                    💡
                                </div>

                               <h3 className="font-extrabold text-blue-950 mt-3 text-lg">
                                    Why enter actual output?
                                </h3>
<p className="text-sm font-medium text-blue-800 mt-2 leading-6">
                                    Ingredients may weigh more before processing
                                    than the final product. Using your actual
                                    finished output gives you a more realistic
                                    cost per {data.product.unit}.
                                </p>

                            </div>

                        </div>

                    </aside>

                </div>

            </main>

        </div>
    )
}


export default Calculator