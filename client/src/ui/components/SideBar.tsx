import React from "react";
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import {routes} from "../../process/helpers/Routes";
import {useHistory, useLocation} from "react-router";

export const SideBar = ({notify, select}: any) => {

	const history = useHistory();
	const location = useLocation();

	const processToggle = (value: boolean) => {
		notify(value)
	}

	const processSelect = (path: string) => {
		const route = findRoute(path);
		select(route);
		history.push(path)
	}

	const findRoute = (path: string): any => {
		return Object.values(routes).find( route => route.path === path);
	}

	const menuItems = Object.values(routes).filter(value => (value.path !== '/users/new' && value.path !== '/users/:id'))

	return (

		<SideNav
			onSelect={processSelect}
			onToggle={(processToggle)}
			className="nav-custom"
		>
			<SideNav.Toggle />
			<SideNav.Nav defaultSelected={location.pathname}>

				{
					menuItems.map(({ title, path, icon: Icon }, i) => (
                        <NavItem eventKey={path} key={i}>
							<NavIcon>
								<Icon style={{ fontSize: '1.75em' }} />
							</NavIcon>
							<NavText>
								{title}
							</NavText>
						</NavItem>
					))
				}
			</SideNav.Nav>

		</SideNav>

	)
}
