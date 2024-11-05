import { BrowserRouter } from "react-router-dom";
import { MyRoutes } from "./routes";
import { Toaster } from "./components/ui/toaster";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <MyRoutes />
        <Toaster />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
