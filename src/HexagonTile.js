import React from 'react';

const createTriangles = () => {
	let hexTriangles = Object.create([]); // create "null" object (same as before)
	Object.setPrototypeOf(hexTriangles, Object.prototype);

	for (let ii = 0; ii < 7; ii++) {
		hexTriangles.push(<div id={`${ii}`}>triangle</div>);
	}

	return hexTriangles;
};

const HexagonTile = () => {
	let hexagons = createTriangles();

	return (
		<div>
			<div className="hexagon-container">
				{hexagons.forEach((hex) => {
					return hex;
				})}
			</div>
		</div>
	);
};

export default HexagonTile;
