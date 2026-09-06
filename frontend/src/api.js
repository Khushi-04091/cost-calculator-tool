const API_URL = "http://localhost:5000/api"


export const getProducts = async () => {
    const response = await fetch(`${API_URL}/products`)

    if (!response.ok) {
        throw new Error("Failed to fetch products")
    }

    return response.json()
}


export const getProduct = async (id) => {
    const response = await fetch(`${API_URL}/products/${id}`)

    if (!response.ok) {
        throw new Error("Failed to fetch product")
    }

    return response.json()
}


export const calculateCost = async (data) => {
    const response = await fetch(`${API_URL}/calculate`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    if (!response.ok) {
        throw new Error("Calculation failed")
    }

    return response.json()
}