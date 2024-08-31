import { Outlet, useLocation } from 'react-router-dom';
import Header from "./Header";
function AppLayout() {
  const location=useLocation();
  const hidelocation=location.pathname.startsWith('/game-start');
   return (
        <>
        <div>
          {!hidelocation?<Header/>:null}
        </div>

        <div  >
        <main className="mx-auto ">
          <Outlet />
        </main>
      </div>
      </>
    )
}
export default AppLayout;