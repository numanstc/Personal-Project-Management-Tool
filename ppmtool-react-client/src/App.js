import React from "react";
import Dashboard from "./componenets/Dashboard";
import Header from "./componenets/Layout/Header";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AddProject from "./componenets/Project/AddProject";
import UpdateProject from "./componenets/Project/UpdateProject";
import ProjectBoard from "./componenets/ProjectBoard/ProjectBoard";
import { Provider } from "react-redux";
import store from "./store";
import AddProjectTask from "./componenets/ProjectBoard/ProjectTasks/AddProjectTask";
import UpdateProjectTask from "./componenets/ProjectBoard/ProjectTasks/UpdateProjectTask";
import Landing from "./componenets/Layout/Landing";
import Register from "./componenets/UserManagement/Register";
import Login from "./componenets/UserManagement/Login";
import jwt_decode from "jwt-decode";
import setJsonWebToken from "./securityUtils/setJsonWebToken";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { SET_CURRENT_USER } from "./actions/types";

const jwt = localStorage.jwtToken; // securityActions.login methodu içinde bunu tamıladık

// giriş yapıldığında locak store a kaydediyoruz sayfa refresh edilmişse ve orada jwt varsa
// o token i tekrar istek headerına ekliyoruz
if (jwt) {
	setJsonWebToken(jwt);
	const decoded_jwt = jwt_decode(jwt);
	store.dispatch({
		type: SET_CURRENT_USER,
		payload: decoded_jwt,
	});

	const currentTime = Date.now() / 1000;
	if (decoded_jwt.exp <= currentTime) {
		// handle logout
		// window.location.href = "/";
	}
}

function App() {
	return (
		<Provider store={store}>
			{/*public global redux database i */}

			<Router>
				<div className="App">
					<Header />

					{/*public Route*/}
					<Route exact path="/" component={Landing} />
					<Route exact path="/register" component={Register} />
					<Route exact path="/login" component={Login} />

					{/*private Roues*/}
					<Route path="/dashboard" component={Dashboard} />
					<Route exact path="/addProject" component={AddProject} />
					<Route exact path="/updateProject/:id" component={UpdateProject} />
					<Route exact path="/projectBoard/:id" component={ProjectBoard} />
					<Route exact path="/addProjectTask/:id" component={AddProjectTask} />
					<Route
						exact
						path="/updateProjectTask/:backlog_id/:pt_id"
						component={UpdateProjectTask}
					/>
				</div>
			</Router>
		</Provider>
	);
}

export default App;
