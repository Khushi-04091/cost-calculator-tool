const express = require("express")
const db = require("../config/db")

const router = express.Router()


router.post("/", async (req, res) => {
    try {
       
let {
    productId,
    materials = [],
    labour = 0,
    production = 0,
    packaging = [],
    otherExpense = 0,
    finishedOutput,
    profitPercent = 0
} = req.body

        // Check product
        const [products] = await db.query(
            `
            SELECT id, name, unit
            FROM products
            WHERE id = ? AND is_active = TRUE
            `,
            [productId]
        )

        if (products.length === 0) {
            return res.status(404).json({
                message: "Product not found"
            })
        }


        // Calculate raw material cost
        let rawMaterialCost = 0

        materials.forEach(material => {
            const quantity = Number(material.quantity) || 0
            const price = Number(material.price) || 0

            rawMaterialCost += quantity * price
        })


        // Calculate packaging cost
        let packagingCost = 0

        packaging.forEach(item => {
            const quantity = Number(item.quantity) || 0
            const price = Number(item.price) || 0

            packagingCost += quantity * price
        })


        // Convert other values to numbers
        labour = Number(labour) || 0
        production = Number(production) || 0
        otherExpense = Number(otherExpense) || 0
        finishedOutput = Number(finishedOutput)
        profitPercent = Number(profitPercent) || 0


        // Validate finished output
        if (!finishedOutput || finishedOutput <= 0) {
            return res.status(400).json({
                message: "Finished output must be greater than 0"
            })
        }


        // Total batch cost
        const totalCost =
            rawMaterialCost +
            labour +
            production +
            packagingCost +
            otherExpense


        // Cost per unit
        const costPerUnit = totalCost / finishedOutput


        // Profit per unit
        const profitPerUnit =
            costPerUnit * (profitPercent / 100)


        // Selling price per unit
        const sellingPrice =
            costPerUnit + profitPerUnit


        res.json({
            product: {
                id: products[0].id,
                name: products[0].name,
                unit: products[0].unit
            },

            breakdown: {
                rawMaterialCost: Number(rawMaterialCost.toFixed(2)),
                labour: Number(labour.toFixed(2)),
                production: Number(production.toFixed(2)),
                packagingCost: Number(packagingCost.toFixed(2)),
                otherExpense: Number(otherExpense.toFixed(2))
            },

            totalCost: Number(totalCost.toFixed(2)),

            finishedOutput: finishedOutput,

            costPerUnit: Number(costPerUnit.toFixed(2)),

            profitPercent: profitPercent,

            profitPerUnit: Number(profitPerUnit.toFixed(2)),

            sellingPrice: Number(sellingPrice.toFixed(2))
        })

    } catch (error) {
        console.error(error)

        res.status(500).json({
            message: "Calculation failed"
        })
    }
})


module.exports = router