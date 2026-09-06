import { useNavigate } from "react-router-dom"

function Agarbatti() {
    const navigate = useNavigate()
    return (
        <div className="min-h-screen bg-gray-100 p-6">

            <div className="max-w-4xl mx-auto">

                {/* Heading */}
                <h1 className="text-4xl font-bold text-gray-800">
                    Agarbatti Cost Calculator
                </h1>

                <p className="text-gray-600 mt-3">
                    Calculate the real cost of making Agarbatti.
                </p>


                {/* Introduction Card */}
                <div className="bg-white rounded-xl shadow-md p-6 mt-8">

                    <h2 className="text-2xl font-semibold text-gray-800">
                        Let's calculate your cost
                    </h2>

                    <p className="text-gray-600 mt-3">
                        We will calculate your cost step by step.
                    </p>

                    <p className="text-gray-600 mt-2">
                        You will enter the amount of raw materials,
                        labour, electricity, packaging and other expenses.
                    </p>


                    {/* Start Button */}
                    <button
    onClick={() => navigate("/product/agarbatti/raw-materials")}
    className="mt-6 bg-blue-600 text-white
               px-6 py-3 rounded-lg
               font-semibold
               hover:bg-blue-700 transition"
>
    Start Calculation →
</button>

                </div>

            </div>

        </div>
    )
}

export default Agarbatti