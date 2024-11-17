import { BrowserRouter } from "react-router-dom";
import { MyRoutes } from "./routes";
import { Toaster } from "./components/ui/toaster";
import { ThemeProvider } from "./components/theme-provider";
import Footer from "./components/Footer";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <div className="app-container">
          <div className="content-container flex-1">
            <MyRoutes />
          </div>
          <Toaster />
          <Footer />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
