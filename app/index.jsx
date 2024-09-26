import * as React from "react";
import * as ReactDOM from "react-dom/client";
import "./index.css";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Loading from "./components/Loading";
// import Results from "./components/Results";
// import Popular from "./components/Popular";
// import Battle from "./components/Battle";

const Results = React.lazy(() => import("./components/Results"));
const Popular = React.lazy(() => import("./components/Popular"));
const Battle = React.lazy(() => import("./components/Battle"));

// Main App component
class App extends React.Component {
   state = {
      theme: "light",
   };

   toggleTheme = () => {
      this.setState(({ theme }) => ({
         theme: theme === "light" ? "dark" : "light",
      }));
   };

   render() {
      return (
         <Router>
            <div className={this.state.theme}>
               <div className='container'>
                  <Nav
                     theme={this.state.theme}
                     toggleTheme={this.toggleTheme}
                  />
                  <React.Suspense fallback={<Loading />}>
                     <Routes>
                        <Route
                           path='/'
                           element={<Popular />}
                        />
                        <Route
                           path='/battle'
                           element={<Battle />}
                        />
                        <Route
                           path='/results'
                           element={<Results />}
                        />
                     </Routes>
                  </React.Suspense>
               </div>
            </div>
         </Router>
      );
   }
}

// Get the root element from the DOM
const rootElement = document.getElementById("app");
// Create a root for React to render the App component
const root = ReactDOM.createRoot(rootElement);
// Render the App component
root.render(<App />);
