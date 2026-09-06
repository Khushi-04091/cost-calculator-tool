import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useCalculator } from "../context/CalculatorContext"

function Expenses() {

    const navigate = useNavigate()

    const { calculatorData, setCalculatorData } = useCalculator()

    const [expenseRules, setExpenseRules] = useState([])

    const [loading, setLoading] = useState(true)

    const [error, setError] = useState("")


    // Fetch expense rules from backend
    useEffect(() => {

        const fetchExpenseRules = async () => {

            try {

                const response = await fetch(
                    "http://localhost:5000/api/products/1/expense-rules"
                )

                const data = await response.json()

                if (!data.success) {
                    throw new Error("Failed to fetch expense rules")
                }

                setExpenseRules(data.rules)

            } catch (error) {

                console.error(error)

                setError("Unable to load expense rules.")

            } finally {

                setLoading(false)

            }
        }

        fetchExpenseRules()

    }, [])


    // Get rule value
    const getRuleValue = (ruleName) => {

        const rule = expenseRules.find(
            (item) => item.rule_name === ruleName
        )

        return rule ? Number(rule.value) : 0
    }


    // =========================
    // POWER
    // =========================

    const extruderPower =
        getRuleValue("Extruder Power")

    const blenderPower =
        getRuleValue("Blender Power")

    const sealingMachinePower =
        getRuleValue("Sealing Machine Power")

    const electricityRate =
        getRuleValue("Electricity Rate")


    const totalPowerPerDay =
        extruderPower +
        blenderPower +
        sealingMachinePower


    const electricityCostPerDay =
        totalPowerPerDay *
        electricityRate


    const productionCapacity =
        Number(
            calculatorData.production?.productionCapacity || 0
        )


    const electricityCostPerKg =
        productionCapacity > 0
            ? electricityCostPerDay / productionCapacity
            : 0


    // =========================
    // MAINTENANCE
    // =========================

    const pistonMaintenance =
        getRuleValue("Piston Maintenance")

    const nozzleMaintenance =
        getRuleValue("Nozzle Maintenance")

    const rocketMaintenance =
        getRuleValue("Rocket Maintenance")

    const blenderMaintenance =
        getRuleValue("Blender Maintenance")

    const sealingBeltMaintenance =
        getRuleValue("Sealing Belt Maintenance")


    const pistonCostPerKg =
        pistonMaintenance > 0
            ? pistonMaintenance / 1400
            : 0


    const nozzleCostPerKg =
        nozzleMaintenance > 0
            ? nozzleMaintenance / 700
            : 0


    const rocketCostPerKg =
        rocketMaintenance > 0
            ? rocketMaintenance / 600
            : 0


    const maintenanceCostPerKg =
        pistonCostPerKg +
        nozzleCostPerKg +
        rocketCostPerKg +
        blenderMaintenance +
        sealingBeltMaintenance


    // =========================
    // OVERHEAD
    // =========================

    const overheadCostPerKg =
        getRuleValue("General Overhead")


    // =========================
    // TOTAL
    // =========================

    const totalExpensePerKg =
        electricityCostPerKg +
        maintenanceCostPerKg +
        overheadCostPerKg


    const handleNext = () => {

        setCalculatorData((previousData) => ({
            ...previousData,

            expenses: {
                electricityCostPerDay:
                    electricityCostPerDay,

                electricityCostPerKg:
                    electricityCostPerKg,

                pistonCostPerKg:
                    pistonCostPerKg,

                nozzleCostPerKg:
                    nozzleCostPerKg,

                rocketCostPerKg:
                    rocketCostPerKg,

                blenderMaintenance:
                    blenderMaintenance,

                sealingBeltMaintenance:
                    sealingBeltMaintenance,

                maintenanceCostPerKg:
                    maintenanceCostPerKg,

                overheadCostPerKg:
                    overheadCostPerKg,

                totalExpensePerKg:
                    totalExpensePerKg
            }
        }))

        navigate("/product/agarbatti/fragrance")
    }


    // Loading
    if (loading) {

        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">

                <p className="text-xl text-gray-600">
                    Loading expense rules...
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
                    Step 3: Labour & Other Expenses
                </h1>

                <p className="text-gray-600 mt-2">
                    These costs are automatically calculated from your
                    production setup.
                </p>


                {/* Explanation */}

                <div className="bg-blue-50 border border-blue-200
                                rounded-xl p-5 mt-6">

                    <h2 className="font-semibold text-blue-800">
                        Why is this important?
                    </h2>

                    <p className="text-blue-700 mt-2">
                        Electricity, machine maintenance and regular
                        overheads are part of the real cost of making
                        your Agarbatti.
                    </p>

                </div>


                {/* Electricity */}

                <div className="bg-white rounded-xl shadow-md p-6 mt-8">

                    <h2 className="text-xl font-semibold text-gray-800">
                        Electricity
                    </h2>

                    <div className="mt-5 space-y-3">

                        <div className="flex justify-between">
                            <span>
                                Extruder
                            </span>

                            <span className="font-semibold">
                                {extruderPower} units/day
                            </span>
                        </div>


                        <div className="flex justify-between">
                            <span>
                                Blender
                            </span>

                            <span className="font-semibold">
                                {blenderPower} units/day
                            </span>
                        </div>


                        <div className="flex justify-between">
                            <span>
                                Sealing machine
                            </span>

                            <span className="font-semibold">
                                {sealingMachinePower} units/day
                            </span>
                        </div>


                        <div className="flex justify-between">
                            <span>
                                Electricity rate
                            </span>

                            <span className="font-semibold">
                                ₹{electricityRate}/unit
                            </span>
                        </div>


                        <div className="border-t pt-3 flex justify-between">
                            <span className="font-semibold">
                                Electricity cost per day
                            </span>

                            <span className="font-bold">
                                ₹{electricityCostPerDay.toFixed(2)}
                            </span>
                        </div>


                        <div className="flex justify-between">
                            <span className="font-semibold">
                                Electricity cost per kg
                            </span>

                            <span className="font-bold text-green-700">
                                ₹{electricityCostPerKg.toFixed(2)}
                            </span>
                        </div>

                    </div>

                </div>


                {/* Maintenance */}

                <div className="bg-white rounded-xl shadow-md p-6 mt-6">

                    <h2 className="text-xl font-semibold text-gray-800">
                        Machine Maintenance
                    </h2>

                    <div className="mt-5 space-y-3">

                        <div className="flex justify-between">
                            <span>
                                Piston
                            </span>

                            <span className="font-semibold">
                                ₹{pistonCostPerKg.toFixed(2)}/kg
                            </span>
                        </div>


                        <div className="flex justify-between">
                            <span>
                                Nozzle
                            </span>

                            <span className="font-semibold">
                                ₹{nozzleCostPerKg.toFixed(2)}/kg
                            </span>
                        </div>


                        <div className="flex justify-between">
                            <span>
                                Rocket
                            </span>

                            <span className="font-semibold">
                                ₹{rocketCostPerKg.toFixed(2)}/kg
                            </span>
                        </div>


                        <div className="flex justify-between">
                            <span>
                                Blender
                            </span>

                            <span className="font-semibold">
                                ₹{blenderMaintenance.toFixed(2)}/kg
                            </span>
                        </div>


                        <div className="flex justify-between">
                            <span>
                                Sealing belt
                            </span>

                            <span className="font-semibold">
                                ₹{sealingBeltMaintenance.toFixed(2)}/kg
                            </span>
                        </div>


                        <div className="border-t pt-3 flex justify-between">

                            <span className="font-semibold">
                                Total maintenance
                            </span>

                            <span className="font-bold text-green-700">
                                ₹{maintenanceCostPerKg.toFixed(2)}/kg
                            </span>

                        </div>

                    </div>

                </div>


                {/* Overhead */}

                <div className="bg-white rounded-xl shadow-md p-6 mt-6">

                    <h2 className="text-xl font-semibold text-gray-800">
                        General Overhead
                    </h2>

                    <p className="text-gray-500 mt-2">
                        Other regular expenses related to production.
                    </p>

                    <div className="bg-green-50 rounded-lg p-4 mt-5">

                        <p className="text-gray-600">
                            Overhead cost per kg
                        </p>

                        <p className="text-2xl font-bold text-green-700">
                            ₹{overheadCostPerKg.toFixed(2)}
                        </p>

                    </div>

                </div>


                {/* Total */}

                <div className="bg-green-50 border border-green-200
                                rounded-xl p-6 mt-6">

                    <h2 className="text-xl font-semibold text-green-800">
                        Total Expenses
                    </h2>

                    <p className="text-gray-600 mt-3">
                        Electricity + Maintenance + Overhead
                    </p>

                    <p className="text-3xl font-bold text-green-700 mt-2">
                        ₹{totalExpensePerKg.toFixed(2)} / kg
                    </p>

                </div>


                {/* Next */}

                <button
                    onClick={handleNext}
                    className="mt-8 bg-blue-600 text-white
                               px-8 py-4 rounded-xl
                               font-semibold text-lg
                               hover:bg-blue-700 transition"
                >
                    Next: Fragrance →
                </button>

            </div>

        </div>
    )
}

export default Expenses