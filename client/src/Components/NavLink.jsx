import { Link } from "react-router-dom";

export default function NavLink({children, ...props }) {
    return (
        <Link
            {...props}
            className="text-white font-semibold hover:bg-gray-700 p-2 rounded"
        >
            {children}
        </Link>
    );
}
