import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Suspense} from "react";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {createRoot} from "react-dom/client";
import {RouterProvider} from "react-router-dom";
import Spinner from "./components/ui/Spinner";
import {AuthProvider} from "./context/AuthProvider";
import {ThemeProvider} from "./context/ThemeProvider";
import {router} from "./router/router";
import "./styles/global.css";
import CustomToaster from "./components/modals/CustomToaster";

/**
 * Configuration du client React Query pour la gestion du cache et des requêtes
 */
const queryClient = new QueryClient();

/**
 * Point d'entrée principal de l'application
 * Configure les providers nécessaires :
 * - Suspense pour le chargement asynchrone
 * - QueryClientProvider pour React Query
 * - DndProvider pour le drag and drop
 * - AuthProvider pour l'authentification
 * - ThemeProvider pour le thème
 * - RouterProvider pour le routage
 * - Toaster pour les notifications
 */
createRoot(document.getElementById("root")!).render(
  <Suspense fallback={<Spinner />}>
    <QueryClientProvider client={queryClient}>
      <DndProvider backend={HTML5Backend}>
        <AuthProvider>
          <ThemeProvider>
            <RouterProvider router={router} />
            <CustomToaster />
          </ThemeProvider>
        </AuthProvider>
      </DndProvider>
    </QueryClientProvider>
  </Suspense>,
);

/**
 * Point de montage secondaire pour les modales
 * Utilise le même client React Query pour maintenir la cohérence des données
 */
createRoot(document.getElementById("modal")!).render(
  <QueryClientProvider client={queryClient}></QueryClientProvider>,
);
