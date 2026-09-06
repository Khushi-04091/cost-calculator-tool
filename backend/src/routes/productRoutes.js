const express = require("express")
const db = require("../config/db")
const { calculateCost } = require("../services/costingService")

const router = express.Router()

// Get all active products
router.get("/", async (req, res) => {
    try {
        const [products] = await db.query(`
            SELECT 
                id,
                name,
                description,
                unit
            FROM products
            WHERE is_active = TRUE
            ORDER BY name
        `)

        res.json(products)
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Failed to fetch products"
        })
    }
})


// Get one product
router.get("/:id", async (req, res) => {
    try {
        const [products] = await db.query(`
            SELECT 
                id,
                name,
                description,
                unit
            FROM products
            WHERE id = ? AND is_active = TRUE
        `, [req.params.id])

        if (products.length === 0) {
            return res.status(404).json({
                message: "Product not found"
            })
        }

        res.json(products[0])
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Failed to fetch product"
        })
    }
})


// Get product raw materials
router.get("/:id/materials", async (req, res) => {
    try {
        const [materials] = await db.query(`
            SELECT
                pm.raw_material_id,
                rm.name,
                rm.unit,
                pm.quantity
            FROM product_materials pm
            JOIN raw_materials rm
                ON pm.raw_material_id = rm.id
            WHERE pm.product_id = ?
              AND rm.is_active = TRUE
        `, [req.params.id])

        res.json(materials)
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Failed to fetch materials"
        })
    }
})


// Get product costing configuration
router.get("/:id/config", async (req, res) => {
    try {
        const [config] = await db.query(`
            SELECT
                labour_enabled,
                production_enabled,
                yield_enabled,
                packaging_enabled,
                other_expense_enabled
            FROM product_costing
            WHERE product_id = ?
        `, [req.params.id])

        if (config.length === 0) {
            return res.status(404).json({
                message: "Costing configuration not found"
            })
        }

        res.json(config[0])
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Failed to fetch costing configuration"
        })
    }
})


// Get product packaging
router.get("/:id/packaging", async (req, res) => {
    try {
        const [packaging] = await db.query(`
            SELECT
                pp.packaging_material_id,
                pm.name,
                pm.unit,
                pp.quantity
            FROM product_packaging pp
            JOIN packaging_materials pm
                ON pp.packaging_material_id = pm.id
            WHERE pp.product_id = ?
              AND pm.is_active = TRUE
        `, [req.params.id])

        res.json(packaging)
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Failed to fetch packaging"
        })
    }
})
// Calculate product cost
router.post("/:id/calculate", async (req, res) => {
    try {
        const result = calculateCost(req.body)

        res.json({
            success: true,
            result
        })
    } catch (error) {
        console.error("Calculation error:", error)

        res.status(500).json({
            success: false,
            message: "Failed to calculate cost"
        })
    }
})

module.exports = router