import { Button } from "@/components/ui/button";
import { Outlet } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

const MainLayout = () => {
  return (
    <div className="main-layout">
      <header style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#eee' }}>
        <h1>Platzi</h1>
        <Button className="cursor-pointer" onClick={() => useAuthStore.getState().logout()}>Logout</Button>
      </header>

      <main style={{ padding: '20px' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
