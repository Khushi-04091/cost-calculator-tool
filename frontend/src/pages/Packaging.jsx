import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useCalculator } from "../context/CalculatorContext"

function Packaging() {

    const navigate = useNavigate()

    const { calculatorData, setCalculatorData } = useCalculator()

    const [packagingRules, setPackagingRules] = useState([])

    const [labourRules, setLabourRules] = useState([])

    const [productionRules, setProductionRules] = useState([])

    const [loading, setLoading] = useState(true)

    const [error, setError] = useState("")


    // Fetch packaging rules
    useEffect(() => {

        const fetchPackagingRules = async () => {

            try {

                const response = await fetch(
                    "http://localhost:5000/api/products/1/packaging-rules"
                )

                const data = await response.json()

                if (!data.success) {
                    throw new Error("Failed to fetch packaging rules")
                }

                setPackagingRules(data.packaging)
                setLabourRules(data.labourRules)
                setProductionRules(data.productionRules)

            } catch (error) {

                console.error(error)

                setError("Unable to load packaging rules.")

            } finally {

                setLoading(false)

            }
        }

        fetchPackagingRules()

    }, [])


    // Get labour rule
    const getLabourValue = (ruleName) => {

        const rule = labourRules.find(
            (item) => item.rule_name === ruleName
        )

        return rule ? Number(rule.value) : 0
    }


    // Get production rule
    const getProductionValue = (ruleName) => {

        const rule = productionRules.find(
            (item) => item.rule_name === ruleName
        )

        return rule ? Number(rule.value) : 0
    }


    // Find packaging material
    const getPackagingMaterial = (name) => {

        return packagingRules.find(
            (item) => item.name === name
        )

    }


    // =========================
    // RULES
    // =========================

    const battiPerKg =
        getProductionValue("Batti per Kg")


    const fillingLabour =
        getLabourValue("Filling Labour")

    const fillingPacks =
        getLabourValue("Filling Productivity")

    const sealingLabour =
        getLabourValue("Sealing Labour")

    const sealingPacks =
        getLabourValue("Sealing Productivity")


    // =========================
    // PACK SIZE
    // =========================

    const sticksPerPack = 20


    // =========================
    // PREVIOUS STEP COST
    // =========================

    const fragranceCostPerKg =
        Number(
            calculatorData.fragrance?.totalProcessingCost || 0
        )


    /*
        At this stage we use the processing cost
        from Step 4.

        Raw batti cost will be combined with this
        in the final costing calculation.
    */

    const battiPerPackCost =
        battiPerKg > 0
            ? (fragranceCostPerKg / battiPerKg) *
              sticksPerPack
            : 0


    // =========================
    // PRIMARY PACKAGING
    // =========================

    const primaryPackaging =
        getPackagingMaterial("Primary Pouch")


    const primaryPackagingCost =
        primaryPackaging
            ? Number(primaryPackaging.cost_per_pack)
            : 0


    // =========================
    // SECONDARY
    // =========================

    const secondaryPackaging =
        getPackagingMaterial("Secondary Packaging")


    const secondaryPackagingCost =
        secondaryPackaging
            ? Number(secondaryPackaging.cost_per_pack)
            : 0


    // =========================
    // TERTIARY
    // =========================

    const tertiaryPackaging =
        getPackagingMaterial("Tertiary Packaging")


    const tertiaryPackagingCost =
        tertiaryPackaging
            ? Number(tertiaryPackaging.cost_per_pack)
            : 0


    // =========================
    // FILLING LABOUR
    // =========================

    const fillingLabourPerPack =
        fillingPacks > 0
            ? fillingLabour / fillingPacks
            : 0


    // =========================
    // SEALING LABOUR
    // =========================

    const sealingLabourPerPack =
        sealingPacks > 0
            ? sealingLabour / sealingPacks
            : 0


    // =========================
    // TOTAL
    // =========================

    const totalPackagingCost =
        battiPerPackCost +
        primaryPackagingCost +
        secondaryPackagingCost +
        tertiaryPackagingCost +
        fillingLabourPerPack +
        sealingLabourPerPack


    const handleNext = () => {

        setCalculatorData((previousData) => ({
            ...previousData,

            packaging: {

                sticksPerPack:
                    sticksPerPack,

                sticksPerKg:
                    battiPerKg,

                primaryPackagingCost:
                    primaryPackagingCost,

                secondaryPackagingCost:
                    secondaryPackagingCost,

                tertiaryPackagingCost:
                    tertiaryPackagingCost,

                fillingLabour:
                    fillingLabour,

                fillingPacks:
                    fillingPacks,

                fillingLabourPerPack:
                    fillingLabourPerPack,

                sealingLabour:
                    sealingLabour,

                sealingPacks:
                    sealingPacks,

                sealingLabourPerPack:
                    sealingLabourPerPack,

                battiPerPackCost:
                    battiPerPackCost,

                totalPackagingCost:
                    totalPackagingCost
            }
        }))

        navigate("/product/agarbatti/result")
    }


    // Loading

    if (loading) {

        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">

                <p className="text-xl text-gray-600">
                    Loading packaging rules...
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
                    Step 5: Packaging
                </h1>

                <p className="text-gray-600 mt-2">
                    Calculate the cost of packing your Agarbatti.
                </p>


                {/* Explanation */}

                <div className="bg-blue-50 border border-blue-200
                                rounded-xl p-5 mt-6">

                    <h2 className="font-semibold text-blue-800">
                        Why do we calculate packaging separately?
                    </h2>

                    <p className="text-blue-700 mt-2">
                        The pouch, secondary packaging, tertiary packaging,
                        filling and sealing all add to your final cost.
                    </p>

                </div>


                {/* Pack Size */}

                <div className="bg-white rounded-xl shadow-md p-6 mt-8">

                    <h2 className="text-xl font-semibold text-gray-800">
                        1. Pack Size
                    </h2>

                    <div className="mt-5 flex justify-between">

                        <span>
                            Sticks in one pack
                        </span>

                        <span className="font-semibold">
                            {sticksPerPack} sticks
                        </span>

                    </div>

                    <div className="mt-4 flex justify-between">

                        <span>
                            Sticks made from 1 kg
                        </span>

                        <span className="font-semibold">
                            {battiPerKg} sticks/kg
                        </span>

                    </div>

                </div>


                {/* Agarbatti Cost */}

                <div className="bg-white rounded-xl shadow-md p-6 mt-6">

                    <h2 className="text-xl font-semibold text-gray-800">
                        2. Agarbatti Cost
                    </h2>

                    <p className="text-gray-500 mt-2">
                        Cost carried forward from the previous processing step.
                    </p>

                    <div className="bg-green-50 rounded-lg p-4 mt-5">

                        <p className="text-gray-600">
                            Processing cost per kg
                        </p>

                        <p className="text-2xl font-bold text-green-700">
                            ₹{fragranceCostPerKg.toFixed(2)}
                        </p>

                    </div>

                    <div className="bg-green-50 rounded-lg p-4 mt-4">

                        <p className="text-gray-600">
                            Cost for {sticksPerPack} sticks
                        </p>

                        <p className="text-2xl font-bold text-green-700">
                            ₹{battiPerPackCost.toFixed(2)}
                        </p>

                    </div>

                </div>


                {/* Primary Packaging */}

                <div className="bg-white rounded-xl shadow-md p-6 mt-6">

                    <h2 className="text-xl font-semibold text-gray-800">
                        3. Primary Packaging
                    </h2>

                    <p className="text-gray-500 mt-2">
                        Pouch directly containing the Agarbatti.
                    </p>

                    <div className="mt-5 space-y-3">

                        <div className="flex justify-between">

                            <span>
                                Price including GST
                            </span>

                            <span className="font-semibold">
                                ₹{primaryPackaging
                                    ? Number(primaryPackaging.price_including_gst).toFixed(2)
                                    : "0.00"}
                                /kg
                            </span>

                        </div>

                        <div className="flex justify-between">

                            <span>
                                Pouches per kg
                            </span>

                            <span className="font-semibold">
                                {primaryPackaging
                                    ? Number(primaryPackaging.quantity_per_kg)
                                    : 0}
                            </span>

                        </div>

                        <div className="border-t pt-3 flex justify-between">

                            <span className="font-semibold">
                                Cost per pack
                            </span>

                            <span className="font-bold text-green-700">
                                ₹{primaryPackagingCost.toFixed(2)}
                            </span>

                        </div>

                    </div>

                </div>


                {/* Secondary */}

                <div className="bg-white rounded-xl shadow-md p-6 mt-6">

                    <h2 className="text-xl font-semibold text-gray-800">
                        4. Secondary Packaging
                    </h2>

                    <p className="text-gray-500 mt-2">
                        Packaging used to hold multiple individual packs.
                    </p>

                    <div className="bg-green-50 rounded-lg p-4 mt-5">

                        <p className="text-gray-600">
                            Cost per pack
                        </p>

                        <p className="text-2xl font-bold text-green-700">
                            ₹{secondaryPackagingCost.toFixed(2)}
                        </p>

                    </div>

                </div>


                {/* Tertiary */}

                <div className="bg-white rounded-xl shadow-md p-6 mt-6">

                    <h2 className="text-xl font-semibold text-gray-800">
                        5. Tertiary Packaging
                    </h2>

                    <p className="text-gray-500 mt-2">
                        Large packaging used for transportation.
                    </p>

                    <div className="bg-green-50 rounded-lg p-4 mt-5">

                        <p className="text-gray-600">
                            Cost per pack
                        </p>

                        <p className="text-2xl font-bold text-green-700">
                            ₹{tertiaryPackagingCost.toFixed(2)}
                        </p>

                    </div>

                </div>


                {/* Filling Labour */}

                <div className="bg-white rounded-xl shadow-md p-6 mt-6">

                    <h2 className="text-xl font-semibold text-gray-800">
                        6. Filling Labour
                    </h2>

                    <div className="mt-5 space-y-3">

                        <div className="flex justify-between">

                            <span>
                                Labour per day
                            </span>

                            <span className="font-semibold">
                                ₹{fillingLabour.toFixed(2)}
                            </span>

                        </div>

                        <div className="flex justify-between">

                            <span>
                                Packs per day
                            </span>

                            <span className="font-semibold">
                                {fillingPacks}
                            </span>

                        </div>

                        <div className="border-t pt-3 flex justify-between">

                            <span className="font-semibold">
                                Filling labour per pack
                            </span>

                            <span className="font-bold text-green-700">
                                ₹{fillingLabourPerPack.toFixed(2)}
                            </span>

                        </div>

                    </div>

                </div>


                {/* Sealing Labour */}

                <div className="bg-white rounded-xl shadow-md p-6 mt-6">

                    <h2 className="text-xl font-semibold text-gray-800">
                        7. Sealing Labour
                    </h2>

                    <div className="mt-5 space-y-3">

                        <div className="flex justify-between">

                            <span>
                                Labour per day
                            </span>

                            <span className="font-semibold">
                                ₹{sealingLabour.toFixed(2)}
                            </span>

                        </div>

                        <div className="flex justify-between">

                            <span>
                                Packs per day
                            </span>

                            <span className="font-semibold">
                                {sealingPacks}
                            </span>

                        </div>

                        <div className="border-t pt-3 flex justify-between">

                            <span className="font-semibold">
                                Sealing labour per pack
                            </span>

                            <span className="font-bold text-green-700">
                                ₹{sealingLabourPerPack.toFixed(2)}
                            </span>

                        </div>

                    </div>

                </div>


                {/* Result */}

                <div className="bg-green-50 border border-green-200
                                rounded-xl p-6 mt-8">

                    <h2 className="text-xl font-semibold text-green-800">
                        Packaging Cost
                    </h2>

                    <div className="space-y-3 mt-4">

                        <div className="flex justify-between">
                            <span>
                                Agarbatti content
                            </span>

                            <span>
                                ₹{battiPerPackCost.toFixed(2)}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span>
                                Primary packaging
                            </span>

                            <span>
                                ₹{primaryPackagingCost.toFixed(2)}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span>
                                Secondary packaging
                            </span>

                            <span>
                                ₹{secondaryPackagingCost.toFixed(2)}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span>
                                Tertiary packaging
                            </span>

                            <span>
                                ₹{tertiaryPackagingCost.toFixed(2)}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span>
                                Filling labour
                            </span>

                            <span>
                                ₹{fillingLabourPerPack.toFixed(2)}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span>
                                Sealing labour
                            </span>

                            <span>
                                ₹{sealingLabourPerPack.toFixed(2)}
                            </span>
                        </div>

                        <div className="border-t pt-4 flex justify-between">

                            <span className="font-semibold">
                                Total Packaging Cost
                            </span>

                            <span className="text-2xl font-bold text-green-700">
                                ₹{totalPackagingCost.toFixed(2)}
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
                    Next: Final Cost →
                </button>

            </div>

        </div>
    )
}

export default Packaging