import { Outlet } from "react-router-dom";
import "./App.css";
import { MainLayout } from "./components/layout/MainLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { enableMapSet } from "immer";
import { Toaster } from "react-hot-toast";

function App() {
  const queryClient = new QueryClient();
  enableMapSet();
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <MainLayout>
          <Toaster
            position="top-right"
            reverseOrder={false}
            gutter={8}
            containerClassName=""
            containerStyle={{}}
            toastOptions={{
              // Define default options
              className: "",
              duration: 4000,
              style: {
                background: "#fff",
                color: "#363636",
              },
              // Default options for specific types
              success: {
                duration: 3000,
                theme: {
                  primary: "green",
                  secondary: "black",
                },
              },
              error: {
                duration: 5000,
              },
            }}
          />
          <div className="flex-1">
            <Outlet />
          </div>
        </MainLayout>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
