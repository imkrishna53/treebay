import { useEffect, useState } from "react";
import { getToken, authHeader, removeToken } from "@/utils/auth";
import { useLocation } from "wouter";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export default function useRequireAdmin() {
  const [, setLocation] = useLocation();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setLocation("/admin/login");
      return;
    }

    // Optionally verify server-side:
    fetch(`${apiBaseUrl}/api/auth/me`, { headers: { ...authHeader() } })
      .then((r) => {
        if (!r.ok) throw new Error("Not authorized");
        return r.json();
      })
      .then(() => setChecking(false))
      .catch(() => {
        removeToken();
        setLocation("/admin/login");
      });
  }, [setLocation]);

  return checking; // components can show loader if true
}
