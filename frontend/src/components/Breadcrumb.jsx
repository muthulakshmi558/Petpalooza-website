// src/components/Breadcrumb.jsx
import { useLocation, Link } from "react-router-dom";

export default function Breadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav className="text-sm text-gray-600 mb-4 px-4">
      <Link to="/">Home</Link>
      {pathnames.map((value, index) => {
        const to = "/" + pathnames.slice(0, index + 1).join("/");
        return (
          <span key={to}>
            {" / "}
            <Link to={to} className="capitalize">
              {value}
            </Link>
          </span>
        );
      })}
    </nav>
  );
}
