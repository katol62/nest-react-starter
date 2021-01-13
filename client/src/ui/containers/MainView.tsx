import React, {useEffect, useState} from "react";
import {TopBar} from "../components/Topbar";
import {Route, Switch, useLocation, useRouteMatch} from "react-router";
import {pages, routes} from "../../process/helpers/Routes";
import {NotFoundPage} from "../pages/NotFound";
import {Container} from "react-bootstrap";
import {SideBar} from "../components/SideBar";

export const MainView = () => {

	const location = useLocation();
	const dynamic = useRouteMatch(`/users/:id`)
	const [expanded, setExpanded] = useState(false);
	const [route, setRoute] = useState({title: ''})

	useEffect( () => {
		const currentPath = dynamic ? dynamic.path : location.pathname;
		const currentRoute = findRoute(currentPath);
		setRoute(currentRoute);
	}, [location, dynamic]);

	const findRoute = (path: string): any => {
		return Object.values(routes).find( route => route.path === path);
	}

	const passExpanded = (value: boolean) => {
		setExpanded(value);
	}
	const selectedRoute = (route: any) => {
		setRoute(route);
	}

	return (
		<Container fluid>
			<SideBar notify={passExpanded} select={selectedRoute} />
			<div className={`content ${expanded ? "expanded" : ""}`}>
				<TopBar title={route.title} />
				<Switch>
					{
						pages.map(
							({ route, exact, component }, index) =>
								<Route key={index} path={route.path} exact={exact} component={component} />
						)
					}
					<Route path='*' exact={true} component={NotFoundPage} />
				</Switch>
			</div>
		</Container>

	)
}
