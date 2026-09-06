import { createContext, useContext, useState } from "react"

const CalculatorContext = createContext()

export function CalculatorProvider({ children }) {

    const [calculatorData, setCalculatorData] = useState({

        // Raw materials
        rawMaterials: [],

        // Production
        production: {
            rawBatti: "",
            wastage: ""
        },

        // Expenses
        expenses: [],

        // Fragrance
        fragrance: {
            depPrice: "",
            fragrancePrice: "",
            depPercentage: 80,
            fragrancePercentage: 20,
            usage: 30,
            labour: "",
            production: ""
        },

        // Packaging
        packaging: {
            sticksPerPack: 20,
            sticksPerKg: 1050,
            pouchPrice: "",
            pouchesPerKg: 430,
            secondaryCost: "",
            secondaryQuantity: "",
            tertiaryCost: "",
            tertiaryQuantity: "",
            fillingLabour: "",
            fillingPacks: "",
            sealingLabour: "",
            sealingPacks: ""
        },

        // Profit
        profitPercentage: 20
    })


    const updateCalculatorData = (section, data) => {

        setCalculatorData((previousData) => ({
            ...previousData,
            [section]: {
                ...previousData[section],
                ...data
            }
        }))

    }


    return (
        <CalculatorContext.Provider
            value={{
                calculatorData,
                setCalculatorData,
                updateCalculatorData
            }}
        >
            {children}
        </CalculatorContext.Provider>
    )
}


export function useCalculator() {

    return useContext(CalculatorContext)

}