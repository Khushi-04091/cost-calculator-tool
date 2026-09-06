import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useCalculator } from "../context/CalculatorContext"

function Fragrance() {

    const navigate = useNavigate()

    const { calculatorData, setCalculatorData } = useCalculator()

    const [depPrice, setDepPrice] = useState("")
    const [fragrancePrice, setFragrancePrice] = useState("")

    const [fragranceRules, setFragranceRules] = useState([])

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")


    // Fetch fragrance rules
    useEffect(() => {

        const fetchFragranceRules = async () => {

            try {

                const response = await fetch(
                    "http://localhost:5000/api/products/1/fragrance-rules"
                )

                const data = await response.json()

                if (!data.success) {
                    throw new Error("Failed to fetch fragrance rules")
                }

                setFragranceRules(data.rules)

            } catch (error) {

                console.error(error)

                setError("Unable to load fragrance rules.")

            } finally {

                setLoading(false)

            }
        }

        fetchFragranceRules()

    }, [])


    // Get rule value
    const getRuleValue = (ruleName) => {

        const rule = fragranceRules.find(
            (item) => item.rule_name === ruleName
        )

        return rule ? Number(rule.value) : 0
    }


    // Rules from database

    const depPercentage =
        getRuleValue("DEP Oil in Fragrance Mix")

    const fragrancePercentage =
        getRuleValue("Concentrated Fragrance in Mix")

    const usage =
        getRuleValue("Fragrance Usage")

    const labour =
        getRuleValue("Dipping Labour")

    const production =
        getRuleValue("Dipping Productivity")


    // =================================
    // Cost of 1 kg mixed fragrance
    // =================================

    const mixedFragranceCost =
        (Number(depPrice) * depPercentage / 100) +
        (Number(fragrancePrice) * fragrancePercentage / 100)


    // =================================
    // Fragrance required for 1 kg raw batti
    // =================================

    const fragranceCostPerKg =
        mixedFragranceCost *
        usage /
        100


    // =================================
    // Dipping labour per kg
    // =================================

    const dippingLabourPerKg =
        production > 0
            ? labour / production
            : 0


    // =================================
    // Total processing cost
    // =================================

    const totalProcessingCost =
        fragranceCostPerKg +
        dippingLabourPerKg


    const handleNext = () => {

        setCalculatorData((previousData) => ({
            ...previousData,

            fragrance: {

                depPrice: depPrice,

                fragrancePrice: fragrancePrice,

                depPercentage: depPercentage,

                fragrancePercentage:
                    fragrancePercentage,

                usage: usage,

                labour: labour,

                production: production,

                mixedFragranceCost:
                    mixedFragranceCost,

                fragranceCostPerKg:
                    fragranceCostPerKg,

                dippingLabourPerKg:
                    dippingLabourPerKg,

                totalProcessingCost:
                    totalProcessingCost
            }
        }))

        navigate("/product/agarbatti/packaging")
    }


    // Loading

    if (loading) {

        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">

                <p className="text-xl text-gray-600">
                    Loading fragrance rules...
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
                    Step 4: Fragrance & Processing
                </h1>

                <p className="text-gray-600 mt-2">
                    Calculate the cost of fragrance used in your Agarbatti.
                </p>


                {/* Explanation */}

                <div className="bg-blue-50 border border-blue-200
                                rounded-xl p-5 mt-6">

                    <h2 className="font-semibold text-blue-800">
                        How does this work?
                    </h2>

                    <p className="text-blue-700 mt-2">
                        Agarbatti is dipped in a mixture of DEP oil and
                        concentrated fragrance. We calculate the cost of
                        this mixture and then find how much is used per kg.
                    </p>

                </div>


                {/* DEP Oil */}

                <div className="bg-white rounded-xl shadow-md p-6 mt-8">

                    <h2 className="text-xl font-semibold text-gray-800">
                        1. DEP Oil
                    </h2>

                    <label className="block text-gray-700 font-medium mt-5 mb-2">
                        Cost of 1 kg DEP Oil
                    </label>

                    <div className="flex items-center gap-3">

                        <span className="text-gray-600">
                            ₹
                        </span>

                        <input
                            type="number"
                            placeholder="Example: 197.06"
                            value={depPrice}
                            onChange={(e) =>
                                setDepPrice(e.target.value)
                            }
                            className="border border-gray-300
                                       rounded-lg p-3 w-full"
                        />

                    </div>

                    <p className="text-gray-500 mt-3">
                        Used in mixture: {depPercentage}%
                    </p>

                </div>


                {/* Concentrated Fragrance */}

                <div className="bg-white rounded-xl shadow-md p-6 mt-6">

                    <h2 className="text-xl font-semibold text-gray-800">
                        2. Concentrated Fragrance
                    </h2>

                    <label className="block text-gray-700 font-medium mt-5 mb-2">
                        Cost of 1 kg concentrated fragrance
                    </label>

                    <div className="flex items-center gap-3">

                        <span className="text-gray-600">
                            ₹
                        </span>

                        <input
                            type="number"
                            placeholder="Example: 1253.16"
                            value={fragrancePrice}
                            onChange={(e) =>
                                setFragrancePrice(e.target.value)
                            }
                            className="border border-gray-300
                                       rounded-lg p-3 w-full"
                        />

                    </div>

                    <p className="text-gray-500 mt-3">
                        Used in mixture: {fragrancePercentage}%
                    </p>

                </div>


                {/* Usage */}

                <div className="bg-white rounded-xl shadow-md p-6 mt-6">

                    <h2 className="text-xl font-semibold text-gray-800">
                        3. Fragrance Usage
                    </h2>

                    <p className="text-gray-500 mt-2">
                        Fragrance mixture used for 1 kg of raw Agarbatti:
                    </p>

                    <div className="bg-green-50 rounded-lg p-4 mt-5">

                        <p className="text-gray-600">
                            Usage
                        </p>

                        <p className="text-2xl font-bold text-green-700">
                            {usage}%
                        </p>

                    </div>

                </div>


                {/* Dipping Labour */}

                <div className="bg-white rounded-xl shadow-md p-6 mt-6">

                    <h2 className="text-xl font-semibold text-gray-800">
                        4. Dipping Labour
                    </h2>

                    <div className="mt-5 space-y-3">

                        <div className="flex justify-between">

                            <span>
                                Labour cost per day
                            </span>

                            <span className="font-semibold">
                                ₹{labour}
                            </span>

                        </div>

                        <div className="flex justify-between">

                            <span>
                                Production handled per day
                            </span>

                            <span className="font-semibold">
                                {production} kg
                            </span>

                        </div>

                        <div className="border-t pt-3
                                        flex justify-between">

                            <span className="font-semibold">
                                Dipping labour per kg
                            </span>

                            <span className="font-bold text-green-700">
                                ₹{dippingLabourPerKg.toFixed(2)}
                            </span>

                        </div>

                    </div>

                </div>


                {/* Result */}

                <div className="bg-green-50 border border-green-200
                                rounded-xl p-6 mt-6">

                    <h2 className="text-xl font-semibold text-green-800">
                        Fragrance Cost
                    </h2>

                    <div className="space-y-3 mt-4">

                        <div className="flex justify-between">

                            <span>
                                Mixed fragrance cost
                            </span>

                            <span className="font-semibold">
                                ₹{mixedFragranceCost.toFixed(2)}/kg
                            </span>

                        </div>


                        <div className="flex justify-between">

                            <span>
                                Fragrance cost per kg
                            </span>

                            <span className="font-semibold">
                                ₹{fragranceCostPerKg.toFixed(2)}
                            </span>

                        </div>


                        <div className="border-t pt-3
                                        flex justify-between">

                            <span className="font-semibold">
                                Total processing cost per kg
                            </span>

                            <span className="font-bold text-green-700">
                                ₹{totalProcessingCost.toFixed(2)}
                            </span>

                        </div>

                    </div>

                </div>


                {/* Next */}

                <button
                    onClick={handleNext}
                    className="mt-8 bg-blue-600 text-white
                               px-8 py-4 rounded-xl
                               font-semibold text-lg
                               hover:bg-blue-700 transition"
                >
                    Next: Packaging →
                </button>

            </div>

        </div>
    )
}

export default Fragrance