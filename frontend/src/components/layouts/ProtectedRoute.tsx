import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import type { ReactNode } from "react";

export function ProtectedRoute({ children }: { children: ReactNode }) {

    const { user, accessToken, loading } = useAuth();

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!user || !accessToken) {
        return <Navigate to="/login" replace />;
    }
    return (
        <>
            {children}
        </>
    )

}

