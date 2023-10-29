import Api from "./examples/Api";
import Array from "./examples/Array";
import Basics from "./examples/Basics";
import ConfirmPassword from "./examples/ConfirmPassword";
import Controlled from "./examples/Controlled";
import InputWithoutLabel from "./examples/InputWithoutLabel";
import SubObject from "./examples/SubObject";
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Home from "./pages/home";

function App() {
    return (
      <Router>
        <div className="mx-auto my-6 max-w-lg space-y-8">
          <Routes>
            <Route path="/" element={<Basics/>} />
            {/* <Route path="/api" component={Api} /> */}
            <Route path="/rooms" element={<Array/>} />
            {/* Add routes for other components */}
          </Routes>
        </div>
      </Router>
    );
  }

export default App;
