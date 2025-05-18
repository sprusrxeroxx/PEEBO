import { Route, Routes } from 'react-router-dom'
import CreatePage from './pages/CreatePage'
import HomePage from './pages/HomePage'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import ProtectedRoute from "./components/ProtectedRoute"
import SavedRecipesPage from "./pages/SavedRecipesPage"
import Layout from './components/Layout'

// Import Analytics conditionally to prevent errors
let Analytics = () => null;
try {
  Analytics = require('@vercel/analytics/react').Analytics;
} catch (error) {
  console.warn("Vercel Analytics not available:", error.message);
}

function App() {
  return (
    <>
      <Layout>
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
      </Layout>
      <Analytics />
    </>
  );
}

export default App;