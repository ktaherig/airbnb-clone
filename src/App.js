import React, { Component } from 'react';
import Flat from './components/flat';
import GoogleMapReact from 'google-map-react';
import Marker from './components/marker';
// import logo from './logo.svg';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			flats: [],
			allFlats: [],
			selectedFlat: null,
			search: ""
		};
	}

	componentDidMount(){
		const url = "https://raw.githubusercontent.com/lewagon/flats-boilerplate/master/flats.json";
		fetch(url) //this is modern AJAX
		.then(response => response.json())
		.then((data) => {
			this.setState({
				flats: data,
				allFlats: data
			})
		})
	}

	selectFlat = (flat) => {
		console.log(flat);
		this.setState({
			selectedFlat: flat
		})
	}

	handleSearch = (event) => {
		this.setState({
			search: event.target.value,
			flats: this.state.allFlats.filter((flat) => new RegExp(event.target.value, "i").exec(flat.name))
		});
	}

	render() {
		let center = {
			lat: 48.856614,
			lng: 2.352222
		}

		if (this.state.selectedFlat) {
			center = {
				lat: this.state.selectedFlat.lat,
				lng: this.state.selectedFlat.lng
			}
		}

		return (
			<div className="app">
				<div className="main">
					<div className="search">
						<input
							type="text"
							placeholder="Search..."
							value={this.state.search}
							onChange={this.handleSearch}
						/>
					</div>
					<div className="flats">
						{this.state.flats.map((flat) => {
							return <Flat 
								key={flat.name} 
								flat={flat} 
								selectFlat={this.selectFlat} />
						})}
					</div>
				</div>
				<div className="map">
					<div style={{ height: '100vh', width: '100%' }}>
						<GoogleMapReact
							center={center}
							zoom={12}
						>
							{this.state.flats.map((flat) => {
								return <Marker 
									key={flat.name} 
									lat={flat.lat} 
									lng={flat.lng} 
									text={flat.price} 
									selected={flat === this.state.selectedFlat}
								/>
							})}
						</GoogleMapReact>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
