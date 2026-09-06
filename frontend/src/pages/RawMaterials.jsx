import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useCalculator } from "../context/CalculatorContext"

function RawMaterials() {

    const navigate = useNavigate()

    const { setCalculatorData } = useCalculator()

    const [materials, setMaterials] = useState([])
    const [bamboo, setBamboo] = useState(null)

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")


    // Fetch premix materials and bamboo
    useEffect(() => {

        const fetchMaterials = async () => {

            try {

                // Fetch Charcoal, Sawdust and Joss Powder
                const materialsResponse = await fetch(
                    "http://localhost:5000/api/products/1/raw-materials"
                )

                const materialsData = await materialsResponse.json()

                if (!materialsData.success) {
                    throw new Error("Failed to fetch raw materials")
                }


                const formattedMaterials =
                    materialsData.materials.map((material) => ({
                        id: material.id,
                        name: material.name,
                        quantity: "",
                        price: "",
                        unitCost: 0,

                        percentage: Number(material.percentage),
                        wastagePercentage:
                            Number(material.wastage_percentage),

                        basePrice: Number(material.base_price),
                        gstPercentage:
                            Number(material.gst_percentage),

                        priceIncludingGst:
                            Number(material.price_including_gst)
                    }))


                setMaterials(formattedMaterials)


                // Fetch Bamboo Stick
                const bambooResponse = await fetch(
                    "http://localhost:5000/api/products/1/bamboo"
                )

                const bambooData = await bambooResponse.json()

                if (!bambooData.success) {
                    throw new Error("Failed to fetch bamboo")
                }


                setBamboo({
                    id: bambooData.bamboo.id,
                    name: bambooData.bamboo.name,

                    quantity: "",
                    price: "",
                    unitCost: 0,

                    basePrice:
                        Number(bambooData.bamboo.base_price),

                    gstPercentage:
                        Number(bambooData.bamboo.gst_percentage),

                    priceIncludingGst:
                        Number(
                            bambooData.bamboo.price_including_gst
                        )
                })


            } catch (error) {

                console.error(error)

                setError("Unable to load raw materials.")

            } finally {

                setLoading(false)

            }
        }

        fetchMaterials()

    }, [])


    // Change premix material
    const handleChange = (index, field, value) => {

        const updatedMaterials = [...materials]

        updatedMaterials[index][field] = value

        const quantity =
            Number(updatedMaterials[index].quantity)

        const price =
            Number(updatedMaterials[index].price)


        if (quantity > 0) {

            updatedMaterials[index].unitCost =
                price / quantity

        } else {

            updatedMaterials[index].unitCost = 0

        }


        setMaterials(updatedMaterials)
    }


    // Change bamboo
    const handleBambooChange = (field, value) => {

        const updatedBamboo = {
            ...bamboo,
            [field]: value
        }


        const quantity =
            Number(updatedBamboo.quantity)

        const price =
            Number(updatedBamboo.price)


        if (quantity > 0) {

            updatedBamboo.unitCost =
                price / quantity

        } else {

            updatedBamboo.unitCost = 0

        }


        setBamboo(updatedBamboo)
    }

const handleNext = () => {

    setCalculatorData((previousData) => ({
        ...previousData,

        rawMaterials: [...materials, bamboo],
        bamboo: bamboo
    }))

    navigate("/product/agarbatti/production")
}
    

    // Loading
    if (loading) {

        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">

                <p className="text-xl text-gray-600">
                    Loading raw materials...
                </p>

            </div>
        )
    }


    // Error
    if (error) {

        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">

                <div className="bg-white p-8 rounded-xl shadow-md text-center">

                    <p className="text-red-600 text-lg">
                        {error}
                    </p>

                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg"
                    >
                        Try Again
                    </button>

                </div>

            </div>
        )
    }


    return (
        <div className="min-h-screen bg-gray-100 p-6">

            <div className="max-w-4xl mx-auto">

                {/* Heading */}

                <h1 className="text-3xl font-bold text-gray-800">
                    Step 1: Raw Materials
                </h1>

                <p className="text-gray-600 mt-2">
                    Enter how much material you bought and how much you paid.
                </p>


                {/* Information */}

                <div className="bg-blue-50 border border-blue-200
                                rounded-xl p-5 mt-6">

                    <h2 className="font-semibold text-blue-800">
                        Why do we ask this?
                    </h2>

                    <p className="text-blue-700 mt-2">
                        This helps us find the actual cost of 1 kg
                        of each raw material.
                    </p>

                </div>


                {/* Premix Materials */}

                <h2 className="text-2xl font-bold text-gray-800 mt-8">
                    Premix Materials
                </h2>

                <p className="text-gray-600 mt-1">
                    These materials are mixed together to make the premix.
                </p>


                <div className="space-y-6 mt-6">

                    {materials.map((material, index) => (

                        <div
                            key={material.id}
                            className="bg-white rounded-xl shadow-md p-6"
                        >

                            <h2 className="text-xl font-semibold text-gray-800">
                                {material.name}
                            </h2>

                            <p className="text-sm text-gray-500 mt-1">
                                Used in premix: {material.percentage}%
                            </p>


                            {/* Quantity */}

                            <div className="mt-5">

                                <label className="block text-gray-700 font-medium mb-2">
                                    How much did you buy?
                                </label>

                                <div className="flex gap-3">

                                    <input
                                        type="number"
                                        placeholder="Example: 10"
                                        value={material.quantity}
                                        onChange={(e) =>
                                            handleChange(
                                                index,
                                                "quantity",
                                                e.target.value
                                            )
                                        }
                                        className="border border-gray-300
                                                   rounded-lg p-3 w-full"
                                    />

                                    <span className="flex items-center text-gray-600">
                                        kg
                                    </span>

                                </div>

                            </div>


                            {/* Price */}

                            <div className="mt-5">

                                <label className="block text-gray-700 font-medium mb-2">
                                    How much did you pay?
                                </label>

                                <div className="flex gap-3">

                                    <span className="flex items-center text-gray-600">
                                        ₹
                                    </span>

                                    <input
                                        type="number"
                                        placeholder="Example: 224"
                                        value={material.price}
                                        onChange={(e) =>
                                            handleChange(
                                                index,
                                                "price",
                                                e.target.value
                                            )
                                        }
                                        className="border border-gray-300
                                                   rounded-lg p-3 w-full"
                                    />

                                </div>

                            </div>


                            {/* Database Price */}

                            <div className="mt-4 text-sm text-gray-500">

                                Database price: ₹
                                {material.priceIncludingGst.toFixed(2)}
                                / kg (including GST)

                            </div>


                            {/* Cost */}

                            <div className="bg-green-50 rounded-lg p-4 mt-5">

                                <p className="text-gray-600">
                                    Cost of 1 kg
                                </p>

                                <p className="text-2xl font-bold text-green-700">
                                    ₹{material.unitCost.toFixed(2)}
                                </p>

                            </div>

                        </div>

                    ))}

                </div>


                {/* Bamboo */}

                {bamboo && (

                    <div className="mt-10">

                        <h2 className="text-2xl font-bold text-gray-800">
                            Bamboo Stick
                        </h2>

                        <p className="text-gray-600 mt-1">
                            Bamboo sticks are used separately to make the
                            Agarbatti sticks.
                        </p>


                        <div className="bg-white rounded-xl shadow-md p-6 mt-6">

                            <h2 className="text-xl font-semibold text-gray-800">
                                Bamboo Stick
                            </h2>


                            {/* Quantity */}

                            <div className="mt-5">

                                <label className="block text-gray-700 font-medium mb-2">
                                    How much did you buy?
                                </label>

                                <div className="flex gap-3">

                                    <input
                                        type="number"
                                        placeholder="Example: 10"
                                        value={bamboo.quantity}
                                        onChange={(e) =>
                                            handleBambooChange(
                                                "quantity",
                                                e.target.value
                                            )
                                        }
                                        className="border border-gray-300
                                                   rounded-lg p-3 w-full"
                                    />

                                    <span className="flex items-center text-gray-600">
                                        kg
                                    </span>

                                </div>

                            </div>


                            {/* Price */}

                            <div className="mt-5">

                                <label className="block text-gray-700 font-medium mb-2">
                                    How much did you pay?
                                </label>

                                <div className="flex gap-3">

                                    <span className="flex items-center text-gray-600">
                                        ₹
                                    </span>

                                    <input
                                        type="number"
                                        placeholder="Example: 1463.20"
                                        value={bamboo.price}
                                        onChange={(e) =>
                                            handleBambooChange(
                                                "price",
                                                e.target.value
                                            )
                                        }
                                        className="border border-gray-300
                                                   rounded-lg p-3 w-full"
                                    />

                                </div>

                            </div>


                            {/* Database Price */}

                            <div className="mt-4 text-sm text-gray-500">

                                Database price: ₹
                                {bamboo.priceIncludingGst.toFixed(2)}
                                / kg (including GST)

                            </div>


                            {/* Cost */}

                            <div className="bg-green-50 rounded-lg p-4 mt-5">

                                <p className="text-gray-600">
                                    Cost of 1 kg
                                </p>

                                <p className="text-2xl font-bold text-green-700">
                                    ₹{bamboo.unitCost.toFixed(2)}

                                </p>

                            </div>

                        </div>

                    </div>

                )}


                {/* Next */}

                <button
                    onClick={handleNext}
                    className="mt-8 bg-blue-600 text-white
                               px-8 py-4 rounded-xl
                               font-semibold text-lg
                               hover:bg-blue-700 transition"
                >
                    Next: Production →
                </button>

            </div>

        </div>
    )
}

export default RawMaterials