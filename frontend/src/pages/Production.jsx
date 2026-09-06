import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useCalculator } from "../context/CalculatorContext"

function Production() {

    const navigate = useNavigate()

    const { calculatorData, setCalculatorData } = useCalculator()

    const [rawBatti, setRawBatti] = useState("")

    const [productionRules, setProductionRules] = useState([])

    const [loading, setLoading] = useState(true)

    const [error, setError] = useState("")


    // Fetch production rules from backend
    useEffect(() => {

        const fetchProductionRules = async () => {

            try {

                const response = await fetch(
                    "http://localhost:5000/api/products/1/production-rules"
                )

                const data = await response.json()

                if (!data.success) {
                    throw new Error("Failed to fetch production rules")
                }

                setProductionRules(data.rules)

            } catch (error) {

                console.error(error)

                setError("Unable to load production rules.")

            } finally {

                setLoading(false)

            }
        }

        fetchProductionRules()

    }, [])


    // Find a rule by name
    const getRuleValue = (ruleName) => {

        const rule = productionRules.find(
            (item) => item.rule_name === ruleName
        )

        return rule ? Number(rule.value) : 0
    }


    const battiPerKg =
        getRuleValue("Batti per Kg")

    const bambooCountPerKg =
        getRuleValue("Bamboo Count per Kg")

    const productionCapacity =
        getRuleValue("Production Capacity")

    const bambooRejection =
        getRuleValue("Bamboo Rejection")

    const finalRawBattiWastage =
        getRuleValue("Final Raw Batti Wastage")


    // --------------------------------
    // Production calculations
    // --------------------------------

    const productionQuantity =
        Number(rawBatti)


    // Bamboo sticks required
    const bambooSticksRequired =
        productionQuantity * battiPerKg


    // Bamboo kg required before rejection
    const bambooKgBeforeRejection =
        bambooCountPerKg > 0
            ? bambooSticksRequired / bambooCountPerKg
            : 0


    // Bamboo rejection
    const bambooRejectionKg =
        bambooKgBeforeRejection *
        bambooRejection /
        100


    // Bamboo kg required after rejection
    const bambooKgRequired =
        bambooKgBeforeRejection +
        bambooRejectionKg


    // Final raw batti wastage
    const wastageAmount =
        productionQuantity *
        finalRawBattiWastage /
        100


    const usableQuantity =
        productionQuantity -
        wastageAmount


    const handleNext = () => {

        setCalculatorData((previousData) => ({
            ...previousData,

            production: {
                rawBatti: rawBatti,

                wastage: finalRawBattiWastage,

                wastageAmount: wastageAmount,

                usableQuantity: usableQuantity,

                battiPerKg: battiPerKg,

                bambooCountPerKg: bambooCountPerKg,

                bambooSticksRequired: bambooSticksRequired,

                bambooKgBeforeRejection:
                    bambooKgBeforeRejection,

                bambooRejection:
                    bambooRejection,

                bambooRejectionKg:
                    bambooRejectionKg,

                bambooKgRequired:
                    bambooKgRequired,

                productionCapacity:
                    productionCapacity
            }
        }))

        navigate("/product/agarbatti/expenses")
    }


    // Loading
    if (loading) {

        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">

                <p className="text-xl text-gray-600">
                    Loading production rules...
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
                    Step 2: Production & Wastage
                </h1>

                <p className="text-gray-600 mt-2">
                    Tell us how much raw Agarbatti you produce.
                </p>


                {/* Information */}

                <div className="bg-blue-50 border border-blue-200
                                rounded-xl p-5 mt-6">

                    <h2 className="font-semibold text-blue-800">
                        Production Information
                    </h2>

                    <p className="text-blue-700 mt-2">
                        The production rules are taken from the product
                        costing data. You don't need to calculate them
                        yourself.
                    </p>

                </div>


                {/* Production Quantity */}

                <div className="bg-white rounded-xl shadow-md p-6 mt-8">

                    <h2 className="text-xl font-semibold text-gray-800">
                        Production Quantity
                    </h2>

                    <p className="text-gray-500 mt-2">
                        How many kg of raw Agarbatti are you producing?
                    </p>

                    <div className="flex items-center gap-3 mt-5">

                        <input
                            type="number"
                            placeholder="Example: 100"
                            value={rawBatti}
                            onChange={(e) =>
                                setRawBatti(e.target.value)
                            }
                            className="border border-gray-300
                                       rounded-lg p-3 w-full"
                        />

                        <span className="text-gray-600">
                            kg
                        </span>

                    </div>

                </div>


                {/* Production Rules */}

                <div className="bg-white rounded-xl shadow-md p-6 mt-6">

                    <h2 className="text-xl font-semibold text-gray-800">
                        Production Rules
                    </h2>

                    <div className="mt-4 space-y-3">

                        <div className="flex justify-between">
                            <span>
                                Batti per kg
                            </span>

                            <span className="font-semibold">
                                {battiPerKg} sticks
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span>
                                Bamboo sticks per kg
                            </span>

                            <span className="font-semibold">
                                {bambooCountPerKg} sticks
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span>
                                Bamboo rejection
                            </span>

                            <span className="font-semibold">
                                {bambooRejection}%
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span>
                                Final raw batti wastage
                            </span>

                            <span className="font-semibold">
                                {finalRawBattiWastage}%
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span>
                                Production capacity
                            </span>

                            <span className="font-semibold">
                                {productionCapacity} kg/day
                            </span>
                        </div>

                    </div>

                </div>


                {/* Bamboo Calculation */}

                {productionQuantity > 0 && (

                    <div className="bg-white rounded-xl shadow-md p-6 mt-6">

                        <h2 className="text-xl font-semibold text-gray-800">
                            Bamboo Requirement
                        </h2>

                        <div className="mt-4 space-y-3">

                            <div className="flex justify-between">
                                <span>
                                    Bamboo sticks required
                                </span>

                                <span className="font-semibold">
                                    {bambooSticksRequired.toFixed(0)} sticks
                                </span>
                            </div>


                            <div className="flex justify-between">
                                <span>
                                    Bamboo required before rejection
                                </span>

                                <span className="font-semibold">
                                    {bambooKgBeforeRejection.toFixed(2)} kg
                                </span>
                            </div>


                            <div className="flex justify-between">
                                <span>
                                    Bamboo rejection
                                </span>

                                <span className="font-semibold">
                                    {bambooRejectionKg.toFixed(2)} kg
                                </span>
                            </div>


                            <div className="border-t pt-3
                                            flex justify-between">

                                <span className="font-semibold">
                                    Bamboo required
                                </span>

                                <span className="font-bold text-green-700">
                                    {bambooKgRequired.toFixed(2)} kg
                                </span>

                            </div>

                        </div>

                    </div>

                )}


                {/* Final Wastage */}

                {productionQuantity > 0 && (

                    <div className="bg-green-50 border border-green-200
                                    rounded-xl p-6 mt-6">

                        <h2 className="text-xl font-semibold text-green-800">
                            Production Result
                        </h2>

                        <div className="mt-4 space-y-3">

                            <div className="flex justify-between">
                                <span>
                                    Production quantity
                                </span>

                                <span className="font-semibold">
                                    {productionQuantity.toFixed(2)} kg
                                </span>
                            </div>


                            <div className="flex justify-between">
                                <span>
                                    Final production loss
                                </span>

                                <span className="font-semibold">
                                    {wastageAmount.toFixed(2)} kg
                                    ({finalRawBattiWastage}%)
                                </span>
                            </div>


                            <div className="border-t pt-3
                                            flex justify-between">

                                <span className="font-semibold">
                                    Usable quantity
                                </span>

                                <span className="font-bold text-green-700">
                                    {usableQuantity.toFixed(2)} kg
                                </span>

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
                    Next: Other Expenses →
                </button>

            </div>

        </div>
    )
}

export default Production