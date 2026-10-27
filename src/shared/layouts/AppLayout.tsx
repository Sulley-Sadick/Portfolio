import { Outlet } from "react-router";
import { Header } from "./Header";
import { ScrollDirectionProvider } from "../../providers/ScrollDirectionProvider";

export function AppLayout() {
  return (
    <ScrollDirectionProvider>
      <div className="min-h-screen w-full">
        <Header />
        <Outlet />
        {/* <Footer /> */}
      </div>
    </ScrollDirectionProvider>
  );
}
