const API_URL = "http://localhost:5000/api"

export async function getProducts() {
    const response = await fetch(`${API_URL}/products`)

    if (!response.ok) {
        throw new Error("Failed to fetch products")
    }

    const data = await response.json()

    return data
}


export async function getProduct(productId) {
    const response = await fetch(`${API_URL}/products/${productId}`)

    if (!response.ok) {
        throw new Error("Failed to fetch product")
    }

    return response.json()
}


export async function getProductMaterials(productId) {
    const response = await fetch(
        `${API_URL}/products/${productId}/materials`
    )

    if (!response.ok) {
        throw new Error("Failed to fetch materials")
    }

    return response.json()
}


export async function getProductConfig(productId) {
    const response = await fetch(
        `${API_URL}/products/${productId}/config`
    )

    if (!response.ok) {
        throw new Error("Failed to fetch costing configuration")
    }

    return response.json()
}


export async function getProductPackaging(productId) {
    const response = await fetch(
        `${API_URL}/products/${productId}/packaging`
    )

    if (!response.ok) {
        throw new Error("Failed to fetch packaging")
    }

    return response.json()
}

export async function calculateProductCost(productId, data) {
    const response = await fetch(
        `${API_URL}/products/${productId}/calculate`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
    )

    if (!response.ok) {
        throw new Error("Failed to calculate product cost")
    }

    return response.json()
}