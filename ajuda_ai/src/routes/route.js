import { createBrowserRouter } from "react-router-dom";
import Chat from "../views/chat";
import { ManProvider } from "../hooks/man-provider";

const route = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <ManProvider>
          <Chat />
        </ManProvider>
      ),
    },
  ],
  {
    basename: "/ajuda-ai",
  },
);

export default route;
