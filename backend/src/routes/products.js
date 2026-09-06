const express = require("express")
const db = require("../config/db")

const router = express.Router()

// Get all active products
router.get("/", async (req, res) => {
    try {
        const [products] = await db.query(`
            SELECT
                p.id,
                p.name,
                p.description,
                p.unit,
                c.name AS category
            FROM products p
            JOIN categories c
                ON p.category_id = c.id
            WHERE p.is_active = TRUE
            ORDER BY p.id
        `)

        res.json(products)

    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Failed to fetch products"
        })
    }
})

// Get one product with its costing details
router.get("/:id", async (req, res) => {
    try {
        const productId = req.params.id

        // Get product information
        const [products] = await db.query(`
            SELECT
                p.id,
                p.name,
                p.description,
                p.unit,
                c.name AS category
            FROM products p
            JOIN categories c
                ON p.category_id = c.id
            WHERE p.id = ? AND p.is_active = TRUE
        `, [productId])

        if (products.length === 0) {
            return res.status(404).json({
                message: "Product not found"
            })
        }

        // Get raw materials
        const [materials] = await db.query(`
            SELECT
                rm.id,
                rm.name,
                rm.unit,
                pm.quantity,
                rm.price
            FROM product_materials pm
            JOIN raw_materials rm
                ON pm.raw_material_id = rm.id
            WHERE pm.product_id = ?
            AND rm.is_active = TRUE
            ORDER BY rm.id
        `, [productId])

        // Get costing configuration
        const [costing] = await db.query(`
            SELECT
                labour_enabled,
                production_enabled,
                yield_enabled,
                packaging_enabled,
                other_expense_enabled
            FROM product_costing
            WHERE product_id = ?
        `, [productId])

        // Get packaging materials
        const [packaging] = await db.query(`
            SELECT
                pm.id,
                pm.name,
                pm.unit,
                pp.quantity,
                pm.price
            FROM product_packaging pp
            JOIN packaging_materials pm
                ON pp.packaging_material_id = pm.id
            WHERE pp.product_id = ?
            AND pm.is_active = TRUE
            ORDER BY pm.id
        `, [productId])

        res.json({
            product: products[0],
            materials: materials,
            costing: costing[0] || null,
            packaging: packaging
        })

    } catch (error) {
        console.error(error)

        res.status(500).json({
            message: "Failed to fetch product details"
        })
    }
})

module.exports = router