import React from 'react';
import './App.scss';
import {Root} from "./ui/containers/Root";
import {Notification} from "./ui/components/Notivfication";
import {Loading} from "./ui/components/Loading";

function App() {
	return (
		<div className="App">
			<Root/>
			<Notification/>
			<Loading />
		</div>
	);
}

export default App;
