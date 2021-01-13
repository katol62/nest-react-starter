import {gql} from "@apollo/client/core";

export const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

export const LOGGED_IN_USER = gql`
  query LoggedInUser {
    me @client
  }
`;

export const TOKEN = gql`
  query Token {
    token @client
  }
`;

export const LOGIN_USER = gql`
  mutation Login($phone: String!, $password: String!) {
    login(phone: $phone, password: $password) {
      token
    }
  }
`;

export const USER_ME = gql`
  query Me {
	me {
    	id,phone,firstName,lastName,role
  	}
  }
`;

export const LOGOUT_USER = gql`
	mutation Logout {
		isLoggedIn @client
	}
`;

export const GET_USERS = gql`
	query Users($filter: UserFilterDto) {
		users(filter: $filter) {
    		id,phone,firstName,lastName,role
  		}
	}
`;

export const GET_USER = gql`
  query GetUser($filter: UserFilterDto) {
	user(filter: $filter) {
    	id,phone,firstName,lastName,email,role
  	}
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($phone: String!, $password: String!, $firstName: String, $lastName: String, $email: String) {
    create(phone: $phone, password: $password, firstName: $firstName, lastName: $lastName, email: $email) {
      id, phone, role
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($id: Float!, $phone: String, $password: String, $firstName: String, $lastName: String, $email: String) {
    update(id: $id, phone: $phone, password: $password, firstName: $firstName, lastName: $lastName, email: $email) {
      success, 
      user {
      	id,phone,firstName,lastName,role
      }
    }
  }
`;

export const REGISTER_USER = gql`
  mutation Register($phone: String!, $password: String!, $firstName: String, $lastName: String, $email: String) {
    register(phone: $phone, password: $password, firstName: $firstName, lastName: $lastName, email: $email) {
      id, phone, token
    }
  }
`;

export const DELETE_USER = gql`
	mutation DeleteUser($id: Float!) {
		delete(id: $id) {
    		success
  		}
	}
`;


