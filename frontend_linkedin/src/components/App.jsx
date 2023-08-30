import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Header from "./Header";
import Home from "./Home";
import Register from "./Register";
import { useEffect } from "react";
import { getUserAuth } from "../action";
import { connect } from "react-redux";

function App(props) {
  useEffect(() => {
    props.getUserAuth();
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
		      <Route path="/register" element={<Register />} />
          <Route
            path="/feed"
            element={
              <>
                <Header /> <Home />
              </>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => ({
  getUserAuth: () => dispatch(getUserAuth()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
