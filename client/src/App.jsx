import { Box, useColorModeValue } from "@chakra-ui/react"
import { Route, Routes } from 'react-router-dom'
import CreatePage from './pages/CreatePage'
import HomePage from './pages/HomePage'
import SignUp from './pages/SignUp'
import Navbar from "./components/Navbar"
import Login from './pages/Login'
import ProtectedRoute from "./components/ProtectedRoute"
import SavedRecipesPage from "./pages/SavedRecipesPage"

function App() {

  return (
    <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
      {<Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreatePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/saved-recipes"
          element={
            <ProtectedRoute>
              <SavedRecipesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Box>
  )
}

export default App