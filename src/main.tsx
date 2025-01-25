import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
// import { ThemeContextProvider } from "./theme";
import "./i18n";
import { detectCountryAndSetLanguage } from "./i18n/initLanguages.ts";
import { ThemeProviderWrapper } from "./theme/ThemeProviderWrapper.tsx";

(async function bootstrap() {
  // 1) Detect user’s country and set language (before rendering)
  await detectCountryAndSetLanguage();

  // 2) Render your React app
  createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProviderWrapper>
          <App />
        </ThemeProviderWrapper>
      </Provider>
    </BrowserRouter>
  );
})();
