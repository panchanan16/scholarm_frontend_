import { Outlet } from "react-router-dom";
import "./App.css";
import { MainLayout } from "./components/layout/MainLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { enableMapSet } from 'immer';



function App() {
  const queryClient = new QueryClient();
  enableMapSet();
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <MainLayout>
          <div className="flex-1">
            <Outlet />
          </div>
        </MainLayout>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
