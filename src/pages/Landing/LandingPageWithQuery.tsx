import { useLocation } from "react-router";
import LandingPage from "./Landing";

const LandingPageWithQuery: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const showCreateAccount = queryParams.get("createAccount") === "true";

  return <LandingPage defaultShowCreateAccount={showCreateAccount} />;
};

export default LandingPageWithQuery;
