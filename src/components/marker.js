import React from 'react';
import './marker.css';

class Marker extends React.Component {
	render() {
		//const lat = this.props.lat
		let classes = "marker";
		if(this.props.selected) {
			classes += " selected";
		}

		return (
			<div className={classes}>
				{this.props.text}€
			</div>
		);
	}
}

export default Marker;
