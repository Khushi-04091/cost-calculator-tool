function calculateCost(data) {
    const {
        materials = [],
        labour = 0,
        production = 0,
        actualOutput,
        packaging = [],
        otherExpense = 0,
        profitPercentage = 0
    } = data

    // -----------------------------
    // Raw Material Cost
    // -----------------------------

    let rawMaterialCost = 0

    materials.forEach((material) => {
        const quantity = Number(material.quantity) || 0
        const price = Number(material.price) || 0

        rawMaterialCost += quantity * price
    })


    // -----------------------------
    // Packaging Cost
    // -----------------------------

    let packagingCost = 0

    packaging.forEach((item) => {
        const quantity = Number(item.quantity) || 0
        const price = Number(item.price) || 0

        packagingCost += quantity * price
    })


    // -----------------------------
    // Other Costs
    // -----------------------------

    const labourCost = Number(labour) || 0
    const productionCost = Number(production) || 0
    const otherCost = Number(otherExpense) || 0


    // -----------------------------
    // Total Cost
    // -----------------------------

    const totalCost =
        rawMaterialCost +
        labourCost +
        productionCost +
        packagingCost +
        otherCost


    // -----------------------------
    // Cost Per Unit
    // -----------------------------

    const output = Number(actualOutput) || 0

    const costPerUnit =
        output > 0
            ? totalCost / output
            : 0


    // -----------------------------
    // Profit
    // -----------------------------

    const profit =
        costPerUnit *
        (Number(profitPercentage) || 0) /
        100


    // -----------------------------
    // Selling Price
    // -----------------------------

    const sellingPrice =
        costPerUnit + profit


    return {
        rawMaterialCost,
        labourCost,
        productionCost,
        packagingCost,
        otherCost,
        totalCost,
        actualOutput: output,
        costPerUnit,
        profitPercentage: Number(profitPercentage) || 0,
        profitPerUnit: profit,
        sellingPrice
    }
}

module.exports = {
    calculateCost
}