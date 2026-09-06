// const express = require("express")
// const cors = require("cors")


// const db = require("./config/db")
// // Middleware
// const app = express()
// app.use(cors())
// app.use(express.json())

// // Test route
// app.get("/api/health", (req, res) => {
//     res.json({
//         success: true,
//         message: "Backend is working"
//     })
// })


// app.get("/api/products", async (req, res) => {
//     try {
//         const [products] = await db.query(`
//             SELECT
//                 id,
//                 name,
//                 description,
//                 unit
//             FROM products
//             WHERE is_active = TRUE
//             ORDER BY name
//         `)

//         res.json({
//             success: true,
//             products: products
//         })
//     } catch (error) {
//         console.error("Error fetching products:", error.message)

//         res.status(500).json({
//             success: false,
//             message: "Failed to fetch products"
//         })
//     }
// })

// app.get("/api/products/:productId/raw-materials", async (req, res) => {
//     try {
//         const productId = Number(req.params.productId)

//         const [materials] = await db.query(`
//             SELECT
//                 rm.id,
//                 rm.name,
//                 rm.unit,
//                 rm.base_price,
//                 rm.gst_percentage,
//                 rm.price_including_gst,
//                 pm.percentage,
//                 pm.wastage_percentage
//             FROM product_materials pm
//             JOIN raw_materials rm
//                 ON pm.raw_material_id = rm.id
//             WHERE pm.product_id = ?
//             ORDER BY rm.id
//         `, [productId])

//         res.json({
//             success: true,
//             materials: materials
//         })
//     } catch (error) {
//         console.error(
//             "Error fetching raw materials:",
//             error.message
//         )

//         res.status(500).json({
//             success: false,
//             message: "Failed to fetch raw materials"
//         })
//     }
// })
// app.get("/api/products/:productId/bamboo", async (req, res) => {
//     try {
//         const [bamboo] = await db.query(`
//             SELECT
//                 id,
//                 name,
//                 unit,
//                 base_price,
//                 gst_percentage,
//                 price_including_gst
//             FROM raw_materials
//             WHERE name = 'Bamboo Stick'
//               AND is_active = TRUE
//             LIMIT 1
//         `)

//         if (bamboo.length === 0) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Bamboo Stick not found"
//             })
//         }

//         res.json({
//             success: true,
//             bamboo: bamboo[0]
//         })

//     } catch (error) {

//         console.error(
//             "Error fetching bamboo:",
//             error.message
//         )

//         res.status(500).json({
//             success: false,
//             message: "Failed to fetch bamboo"
//         })
//     }
// })
// app.get("/api/products/:productId/production-rules", async (req, res) => {
//     try {

//         const productId = Number(req.params.productId)

//         const [rules] = await db.query(`
//             SELECT
//                 rule_name,
//                 rule_type,
//                 value,
//                 unit,
//                 description
//             FROM costing_rules
//             WHERE product_id = ?
//                AND rule_type IN ('production', 'wastage')
//             ORDER BY id
//         `, [productId])

//         res.json({
//             success: true,
//             rules: rules
//         })

//     } catch (error) {

//         console.error(
//             "Error fetching production rules:",
//             error.message
//         )

//         res.status(500).json({
//             success: false,
//             message: "Failed to fetch production rules"
//         })
//     }
// })

// app.get("/api/products/:productId/expense-rules", async (req, res) => {
//     try {

//         const productId = Number(req.params.productId)

//         const [rules] = await db.query(`
//             SELECT
//                 rule_name,
//                 rule_type,
//                 value,
//                 unit,
//                 description
//             FROM costing_rules
//             WHERE product_id = ?
//               AND rule_type IN (
//                   'power',
//                   'maintenance',
//                   'overhead'
//               )
//             ORDER BY id
//         `, [productId])

//         res.json({
//             success: true,
//             rules: rules
//         })

//     } catch (error) {

//         console.error(
//             "Error fetching expense rules:",
//             error.message
//         )

//         res.status(500).json({
//             success: false,
//             message: "Failed to fetch expense rules"
//         })
//     }
// })
// app.get("/api/products/:productId/fragrance-rules", async (req, res) => {
//     try {

//         const productId = Number(req.params.productId)

//         const [rules] = await db.query(`
//             SELECT
//                 rule_name,
//                 rule_type,
//                 value,
//                 unit,
//                 description
//             FROM costing_rules
//             WHERE product_id = ?
//               AND rule_type IN ('fragrance', 'labour')
//               AND rule_name IN (
//                   'DEP Oil in Fragrance Mix',
//                   'Concentrated Fragrance in Mix',
//                   'Fragrance Usage',
//                   'Dipping Labour',
//                   'Dipping Productivity'
//               )
//             ORDER BY id
//         `, [productId])

//         res.json({
//             success: true,
//             rules: rules
//         })

//     } catch (error) {

//         console.error(
//             "Error fetching fragrance rules:",
//             error.message
//         )

//         res.status(500).json({
//             success: false,
//             message: "Failed to fetch fragrance rules"
//         })
//     }
// })

// app.get("/api/products/:productId/packaging-rules", async (req, res) => {
//     try {

//         const productId = Number(req.params.productId)

//         // Get packaging materials
//         const [packaging] = await db.query(`
//             SELECT
//                 pp.id,
//                 pm.id AS packaging_material_id,
//                 pm.name,
//                 pm.unit,
//                 pm.base_price,
//                 pm.gst_percentage,
//                 pm.price_including_gst,
//                 pm.quantity_per_kg,
//                 pp.quantity_per_pack,
//                 pp.cost_per_pack
//             FROM product_packaging pp
//             JOIN packaging_materials pm
//                 ON pp.packaging_material_id = pm.id
//             WHERE pp.product_id = ?
//             ORDER BY pp.id
//         `, [productId])


//         // Get packaging-related labour rules
//         const [labourRules] = await db.query(`
//             SELECT
//                 rule_name,
//                 rule_type,
//                 value,
//                 unit,
//                 description
//             FROM costing_rules
//             WHERE product_id = ?
//               AND rule_name IN (
//                   'Filling Labour',
//                   'Filling Productivity',
//                   'Sealing Labour',
//                   'Sealing Productivity'
//               )
//             ORDER BY id
//         `, [productId])


//         // Get production rule needed for pack calculation
//         const [productionRules] = await db.query(`
//             SELECT
//                 rule_name,
//                 value,
//                 unit
//             FROM costing_rules
//             WHERE product_id = ?
//               AND rule_name = 'Batti per Kg'
//             LIMIT 1
//         `, [productId])


//         res.json({
//             success: true,
//             packaging: packaging,
//             labourRules: labourRules,
//             productionRules: productionRules
//         })

//     } catch (error) {

//         console.error(
//             "Error fetching packaging rules:",
//             error.message
//         )

//         res.status(500).json({
//             success: false,
//             message: "Failed to fetch packaging rules"
//         })
//     }
// })

// app.post("/api/products/:productId/calculate", async (req, res) => {

//     try {

//         console.log("Calculate API called")
//         console.log("Request body:", req.body)

//         const productId = Number(req.params.productId)

//         const {
//             rawMaterials,
//             fragrance
//         } = req.body


//         // ==========================================
//         // RAW MATERIALS FROM DATABASE
//         // ==========================================

//         const [materialRows] = await db.query(`
//             SELECT
//                 rm.id,
//                 rm.name,
//                 rm.price_including_gst,
//                 pm.percentage,
//                 pm.wastage_percentage
//             FROM product_materials pm
//             JOIN raw_materials rm
//                 ON pm.raw_material_id = rm.id
//             WHERE pm.product_id = ?
//             ORDER BY pm.id
//         `, [productId])


//         // ==========================================
//         // USER ENTERED RAW MATERIAL PRICE
//         // ==========================================

        
// const getUserPrice = (name) => {

//     const material = (rawMaterials || []).find(
//         (item) =>
//             item.name?.trim().toLowerCase() ===
//             name.trim().toLowerCase()
//     )

//     if (material && Number(material.unitCost) > 0) {
//         return Number(material.unitCost)
//     }

//     return 0
// }

//         const charcoalPrice =
//             getUserPrice("Charcoal")

//         const sawdustPrice =
//             getUserPrice("Sawdust")

//         const jossPrice =
//             getUserPrice("Joss Powder")

//         const bambooPrice =
//             getUserPrice("Bamboo Stick")


//         // ==========================================
//         // COSTING RULES
//         // ==========================================

//         const [rules] = await db.query(`
//             SELECT
//                 rule_name,
//                 rule_type,
//                 value
//             FROM costing_rules
//             WHERE product_id = ?
//             ORDER BY id
//         `, [productId])


//         const getRule = (ruleName) => {

//             const rule = rules.find(
//                 (item) => item.rule_name === ruleName
//             )

//             return rule
//                 ? Number(rule.value)
//                 : 0
//         }


//         // ==========================================
//         // PRODUCTION
//         // ==========================================

//         const battiPerKg =
//             getRule("Batti per Kg")

//         const bambooCountPerKg =
//             getRule("Bamboo Count per Kg")

//         const bambooRejection =
//             getRule("Bamboo Rejection")

//         const finalRawBattiWastage =
//             getRule("Final Raw Batti Wastage")

//         const productionCapacity =
//             getRule("Production Capacity")


//         // ==========================================
//         // PREMIX
//         // ==========================================

//         const charcoalPercentage =
//             getRule("Charcoal in Premix")

//         const jossPercentage =
//             getRule("Joss Powder in Premix")

//         const sawdustPercentage =
//             getRule("Sawdust in Premix")


//         const premixRawMaterialCost =
//             (
//                 charcoalPrice *
//                 charcoalPercentage /
//                 100
//             ) +
//             (
//                 jossPrice *
//                 jossPercentage /
//                 100
//             ) +
//             (
//                 sawdustPrice *
//                 sawdustPercentage /
//                 100
//             )


//         // All three premix materials have 3% wastage
//         const premixWastage =
//             materialRows.length > 0
//                 ? Number(
//                     materialRows[0].wastage_percentage || 0
//                 )
//                 : 0


//         const effectivePremixCost =
//             premixRawMaterialCost *
//             (1 + premixWastage / 100)


//         // ==========================================
//         // BAMBOO
//         // ==========================================

//         const bambooProportion =
//             bambooCountPerKg > 0
//                 ? battiPerKg / bambooCountPerKg
//                 : 0


//         const premixProportion =
//             1 - bambooProportion


//         const effectiveBambooPrice =
//             bambooPrice *
//             (1 + bambooRejection / 100)


//         const bambooCostPerKg =
//             effectiveBambooPrice *
//             bambooProportion


//         const premixCostPerKg =
//             effectivePremixCost *
//             premixProportion


//         const rawMaterialCostPerKg =
//             bambooCostPerKg +
//             premixCostPerKg


//         // ==========================================
//         // ELECTRICITY
//         // ==========================================

//         const extruderPower =
//             getRule("Extruder Power")

//         const blenderPower =
//             getRule("Blender Power")

//         const sealingMachinePower =
//             getRule("Sealing Machine Power")

//         const electricityRate =
//             getRule("Electricity Rate")


//         const totalPowerPerDay =
//             extruderPower +
//             blenderPower +
//             sealingMachinePower


//         const electricityCostPerDay =
//             totalPowerPerDay *
//             electricityRate


//         const electricityCostPerKg =
//             productionCapacity > 0
//                 ? electricityCostPerDay /
//                   productionCapacity
//                 : 0


//         // ==========================================
//         // MAINTENANCE
//         // ==========================================

//         const pistonMaintenance =
//             getRule("Piston Maintenance")

//         const nozzleMaintenance =
//             getRule("Nozzle Maintenance")

//         const rocketMaintenance =
//             getRule("Rocket Maintenance")

//         const blenderMaintenance =
//             getRule("Blender Maintenance")

//         const sealingBeltMaintenance =
//             getRule("Sealing Belt Maintenance")


//         const pistonCostPerKg =
//             pistonMaintenance / 1400

//         const nozzleCostPerKg =
//             nozzleMaintenance / 700

//         const rocketCostPerKg =
//             rocketMaintenance / 600


//         const maintenanceCostPerKg =
//             pistonCostPerKg +
//             nozzleCostPerKg +
//             rocketCostPerKg +
//             blenderMaintenance +
//             sealingBeltMaintenance


//         // ==========================================
//         // OVERHEAD
//         // ==========================================

//         const overheadCostPerKg =
//             getRule("General Overhead")


//         // ==========================================
//         // RAW BATTI COST
//         // ==========================================

//         const rawBattiCostBeforeWastage =
//             rawMaterialCostPerKg +
//             electricityCostPerKg +
//             maintenanceCostPerKg +
//             overheadCostPerKg


//         const rawBattiCostPerKg =
//             rawBattiCostBeforeWastage *
//             (1 + finalRawBattiWastage / 100)


//         // ==========================================
//         // FRAGRANCE
//         // ==========================================

//         const depPrice =
//             Number(fragrance?.depPrice || 0)

//         const fragrancePrice =
//             Number(fragrance?.fragrancePrice || 0)


//         const depPercentage =
//             getRule("DEP Oil in Fragrance Mix")

//         const concentratedFragrancePercentage =
//             getRule("Concentrated Fragrance in Mix")

//         const fragranceUsage =
//             getRule("Fragrance Usage")


//         const mixedFragranceCost =
//             (
//                 depPrice *
//                 depPercentage /
//                 100
//             ) +
//             (
//                 fragrancePrice *
//                 concentratedFragrancePercentage /
//                 100
//             )


//         const fragranceCostPerKg =
//             mixedFragranceCost *
//             fragranceUsage /
//             100


//         // ==========================================
//         // DIPPING LABOUR
//         // ==========================================

//         const dippingLabour =
//             getRule("Dipping Labour")

//         const dippingProductivity =
//             getRule("Dipping Productivity")


//         const dippingLabourPerKg =
//             dippingProductivity > 0
//                 ? dippingLabour /
//                   dippingProductivity
//                 : 0


//         const processingCostPerKg =
//             fragranceCostPerKg +
//             dippingLabourPerKg


//         // ==========================================
//         // COMPLETE AGARBATTI COST
//         // ==========================================

//         const dippedAgarbattiCostPerKg =
//             rawBattiCostPerKg +
//             processingCostPerKg


//         // ==========================================
//         // PACKAGING
//         // ==========================================

//         const [packagingRows] = await db.query(`
//             SELECT
//                 pm.name,
//                 pp.cost_per_pack
//             FROM product_packaging pp
//             JOIN packaging_materials pm
//                 ON pp.packaging_material_id = pm.id
//             WHERE pp.product_id = ?
//             ORDER BY pp.id
//         `, [productId])


//         const getPackaging = (name) => {

//             return packagingRows.find(
//                 (item) => item.name === name
//             )

//         }


//         const primaryPackaging =
//             getPackaging("Primary Pouch")

//         const secondaryPackaging =
//             getPackaging("Secondary Packaging")

//         const tertiaryPackaging =
//             getPackaging("Tertiary Packaging")


//         const primaryPackagingCost =
//             primaryPackaging
//                 ? Number(primaryPackaging.cost_per_pack)
//                 : 0

//         const secondaryPackagingCost =
//             secondaryPackaging
//                 ? Number(secondaryPackaging.cost_per_pack)
//                 : 0

//         const tertiaryPackagingCost =
//             tertiaryPackaging
//                 ? Number(tertiaryPackaging.cost_per_pack)
//                 : 0


//         // ==========================================
//         // AGARBATTI CONTENT PER PACK
//         // ==========================================

//         const sticksPerPack = 20


//         const agarbattiContentCostPerPack =
//             battiPerKg > 0
//                 ? (
//                     dippedAgarbattiCostPerKg /
//                     battiPerKg
//                 ) *
//                 sticksPerPack
//                 : 0


//         // ==========================================
//         // PACKING LABOUR
//         // ==========================================

//         const fillingLabour =
//             getRule("Filling Labour")

//         const fillingProductivity =
//             getRule("Filling Productivity")

//         const sealingLabour =
//             getRule("Sealing Labour")

//         const sealingProductivity =
//             getRule("Sealing Productivity")


//         const fillingLabourPerPack =
//             fillingProductivity > 0
//                 ? fillingLabour /
//                   fillingProductivity
//                 : 0


//         const sealingLabourPerPack =
//             sealingProductivity > 0
//                 ? sealingLabour /
//                   sealingProductivity
//                 : 0


//         // ==========================================
//         // FINAL COST
//         // ==========================================

//         const finalCostPerPack =
//             agarbattiContentCostPerPack +
//             primaryPackagingCost +
//             secondaryPackagingCost +
//             tertiaryPackagingCost +
//             fillingLabourPerPack +
//             sealingLabourPerPack


//         // ==========================================
//         // SEND RESULT
//         // ==========================================

//         res.json({

//             success: true,

//             result: {

//                 rawMaterialCostPerKg,

//                 electricityCostPerKg,

//                 maintenanceCostPerKg,

//                 overheadCostPerKg,

//                 rawBattiCostBeforeWastage,

//                 rawBattiCostPerKg,

//                 mixedFragranceCost,

//                 fragranceCostPerKg,

//                 dippingLabourPerKg,

//                 processingCostPerKg,

//                 dippedAgarbattiCostPerKg,

//                 agarbattiContentCostPerPack,

//                 primaryPackagingCost,

//                 secondaryPackagingCost,

//                 tertiaryPackagingCost,

//                 fillingLabourPerPack,

//                 sealingLabourPerPack,

//                 finalCostPerPack
//             }
//         })

//     } catch (error) {

//         console.error(
//             "Error calculating product cost:",
//             error
//         )

//         res.status(500).json({

//             success: false,

//             message:
//                 "Failed to calculate product cost",

//             error:
//                 error.message
//         })
//     }
// })
// module.exports = app


// const express = require("express")
// const cors = require("cors")

// const productRoutes = require("./routes/productRoutes")

// const app = express()

// // Middleware
// app.use(cors())
// app.use(express.json())

// // Health check
// app.get("/api/health", (req, res) => {
//     res.json({
//         success: true,
//         message: "Backend is working"
//     })
// })

// // Product routes
// app.use("/api/products", productRoutes)

// module.exports = app

// const express = require("express")
// const cors = require("cors")

// const app = express()

// app.use(cors())
// app.use(express.json())

// // Test route
// app.get("/", (req, res) => {
//     res.json({
//         message: "Cost Calculator API is running"
//     })
// })

// module.exports = app


const express = require("express")
const cors = require("cors")

const productsRoutes = require("./routes/products")

const calculateRoutes = require("./routes/calculate")

const app = express()

app.use(cors())
app.use(express.json())


// Test route
app.get("/", (req, res) => {
    res.json({
        message: "Cost Calculator API is running"
    })
})

// Product routes
app.use("/api/products", productsRoutes)
app.use("/api/calculate", calculateRoutes)

module.exports = app