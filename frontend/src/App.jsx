// import { BrowserRouter, Routes, Route } from "react-router-dom"

// import Home from "./pages/Home"
// import Category from "./pages/Category"
// import Agarbatti from "./pages/Agarbatti"
// import RawMaterials from "./pages/RawMaterials"
// import Production from "./pages/Production"
// import Expenses from "./pages/Expenses"
// import Fragrance from "./pages/Fragrance"
// import Packaging from "./pages/Packaging"
// import Result from "./pages/Result"
// import ProductSelection from "./pages/ProductSelection"
// import Calculator from "./pages/Calculator"

// function App() {
//     return (
//         <BrowserRouter>

//             <Routes>
//                 <Route path="/products" element={<ProductSelection />} />
//                 <Route
//     path="/calculator/:productId"
//     element={<Calculator />}
// />
//  <Route
//     path="/result"
//     element={<Result />}
// />

//                 <Route
//                     path="/"
//                     element={<Home />}
//                 />

//                 <Route
//                     path="/category/puja"
//                     element={<Category />}
//                 />

//                 <Route
//                     path="/product/agarbatti"
//                     element={<Agarbatti />}
//                 />

//                 <Route
//                     path="/product/agarbatti/raw-materials"
//                     element={<RawMaterials />}
//                 />
//                 <Route
//     path="/product/agarbatti/production"
//     element={<Production />}
// />
// <Route
//     path="/product/agarbatti/expenses"
//     element={<Expenses />}
// />
// <Route
//     path="/product/agarbatti/fragrance"
//     element={<Fragrance />}
// />
// <Route
//     path="/product/agarbatti/packaging"
//     element={<Packaging />}
// />
// <Route
//     path="/product/agarbatti/result"
//     element={<Result />}
// />

//             </Routes>
  

//         </BrowserRouter>
//     )
// }

// export default App

import { BrowserRouter, Routes, Route } from "react-router-dom"

import ProductSelection from "./pages/ProductSelection"
import Calculator from "./pages/Calculator"
import Result from "./pages/Result"

function App() {

    return (
        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<ProductSelection />}
                />
                <Route
    path="/calculator/:id"
    element={<Calculator />}
/>

                <Route
                    path="/products"
                    element={<ProductSelection />}
                />
                <Route
    path="/result"
    element={<Result />}
/>

            </Routes>

        </BrowserRouter>
    )
}


export default App
