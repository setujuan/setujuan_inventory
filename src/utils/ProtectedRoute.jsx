import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRoles }) {
  // Check if the session exists in localStorage
  const session = JSON.parse(localStorage.getItem("session"));

  // If there's no session, redirect to home (login page)
  if (!session) {
    return <Navigate to="/" replace />;
  }

  // Check if the user's role is allowed for the route
  const userRole = session.role; // Assuming the role is stored in session under 'role'
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/dashboard" replace />; // Redirect to home if role is not allowed
  }

  return children; // Render children if validation passes
}

export default ProtectedRoute;
