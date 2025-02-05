import { Outlet } from "react-router-dom";
import ThemeToggler from "../../components/theme/toggler";
export default function AuthLayout() {
  return (
    <div>
      <Outlet />
      <div className="fixed bottom-10 right-10">
        <ThemeToggler />
      </div>
    </div>
  );
}
