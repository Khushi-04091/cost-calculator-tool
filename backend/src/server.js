require("dotenv").config()

const app = require("./app")
const db = require("./config/db")

const PORT = process.env.PORT || 5000

async function startServer() {
    try {
        const connection = await db.getConnection()

        console.log("MySQL connected successfully")

        connection.release()

        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`)
        })
    } catch (error) {
        console.error("MySQL connection failed:")
        console.error(error.message)
    }
}

startServer()