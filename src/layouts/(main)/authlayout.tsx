import { Outlet } from "react-router-dom";
import ThemeToggler from "../../components/theme/toggler";
export default function AuthLayout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
