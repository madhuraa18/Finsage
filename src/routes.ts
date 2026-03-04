 import { createBrowserRouter } from "react-router";
import { AppLayout } from "./components/AppLayout";
import { LandingPage } from "./pages/LandingPage";
import { OnboardingPage } from "./pages/OnboardingPage";
import { DashboardPage } from "./pages/dashboardPage";
import { AdvisorPage } from "./pages/AdvisorPage";
import { CalculatorPage } from "./pages/CalculatorPage";
import { LearnPage } from "./pages/LearnPage";
import { MarketPage } from "./pages/MarketPage";
import { PortfolioPage } from "./pages/PortfolioPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/onboarding",
    Component: OnboardingPage,
  },
  {
    path: "/app",
    Component: AppLayout,
    children: [
      { index: true, Component: DashboardPage },
      { path: "advisor", Component: AdvisorPage },
      { path: "calculator", Component: CalculatorPage },
      { path: "learn", Component: LearnPage },
      { path: "market", Component: MarketPage },
      { path: "portfolio", Component: PortfolioPage },
    ],
  },
]);
