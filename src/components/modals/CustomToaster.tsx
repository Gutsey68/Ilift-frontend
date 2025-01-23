import {Toaster} from "react-hot-toast";
import {useContext} from "react";
import {ThemeContext} from "../../context/ThemeContext";

/**
 * Composant personnalisé pour le Toaster qui utilise le contexte de thème
 * @component
 * @returns {JSX.Element} Toaster avec styles basés sur le thème
 */
const CustomToaster = () => {
  const { isDark } = useContext(ThemeContext);

  return (
    <Toaster
      toastOptions={{
        style: {
          border: "1px solid",
          borderColor: !isDark ? "#d7d8df" : "#3b3b3b",
          color: !isDark ? "#61626b" : "#b5b5b5",
          background: !isDark ? "#ffffff" : "#0a0a0a",
        },
      }}
    />
  );
};

export default CustomToaster;
