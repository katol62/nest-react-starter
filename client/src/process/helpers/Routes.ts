import {HomePage} from "../../ui/pages/Home";
import {DetailsPage} from "../../ui/pages/Details";
import {UserPage} from "../../ui/pages/User";
import {UsersPage} from "../../ui/pages/Users";
import {HouseDoor, ListTask, People, Person} from "react-bootstrap-icons";

export const unauthorized = [
	{path: '/login'}
]

export const routes = {
	home: { path: '/', title: 'Home', icon: HouseDoor},
	details: { path: '/details', title: 'Details', icon: ListTask},
	users: { path: '/users', title: 'Users', icon: People},
	userNew: { path: '/users/new', title: 'New user', icon: Person},
	userEdit: { path: '/users/:id', title: 'Edit user', icon: Person},
};

export const pages = [
	{ route: routes.home, exact: true, component: HomePage },
	{ route: routes.details, exact: true, component: DetailsPage },
	{ route: routes.userNew, exact: true, component: UserPage },
	{ route: routes.userEdit, exact: true, component: UserPage },
	{ route: routes.users, exact: true, component: UsersPage }
];
