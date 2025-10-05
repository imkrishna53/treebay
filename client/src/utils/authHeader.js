export default function authHeader() {
  const token = localStorage.getItem("admin_token") || "null";

  if (token) {
    return { Authorization: `Bearer ${token}` };
  } else {
    return {};
  }
}
