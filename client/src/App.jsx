import { Box, useColorModeValue } from "@chakra-ui/react"
import { Route, Routes } from 'react-router-dom'
import CreatePage from './pages/CreatePage'
import HomePage from './pages/HomePage'
import SignUp from './pages/SignUp'
import Navbar from "./components/Navbar"
import Login from './pages/Login';

function App() {

  return (
    <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
      {<Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Box>
  )
}

export default App