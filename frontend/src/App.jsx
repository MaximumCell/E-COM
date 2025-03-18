import { Box, useColorModeValue } from "@chakra-ui/react"
import { Route, Routes } from "react-router-dom"
import CreatePage from "./Pages/CreatePage.jsx"
import HomePage from "./Pages/HomePage.jsx"
import Navbar from "./components/Navbar.jsx"

function App() {

  return (
    <>
     <Box minH={"100vh"}  bg={useColorModeValue("gray.100", "gray.800")}>
      <Navbar />
      <Routes>
        {/* navbar */}
        <Route path="/" element= {<HomePage />} />
        <Route path="/create" element= {<CreatePage />} />
      </Routes>

     </Box>
    </>
  )
}

export default App
