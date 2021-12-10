import React, { Component } from "react";
import SelectedDish from "./DishDetailComponent";
import {
	Card,
	CardImg,
	CardImgOverlay,
	CardText,
	CardBody,
	CardTitle,
} from "reactstrap";

class Menu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedDish: null,
		};
	}

	onDishSelect(dish) {
		this.setState({ selectedDish: dish });
		console.log("fuck", this.state.selectedDish);
	}

	render() {
		const menu = this.props.dishes.map((dish) => {
			return (
				<div className="col-12 col-md-5 m-1">
					<Card key={dish.id} onClick={() => this.onDishSelect(dish)}>
						<CardImg width="100%" src={dish.image} alt={dish.name} />
						<CardImgOverlay>
							<CardTitle>{dish.name}</CardTitle>
						</CardImgOverlay>
					</Card>
				</div>
			);
		});

		return (
			<div className="container mb-2">
				<div className="row">{menu}</div>
				<SelectedDish selectedDish={this.state.selectedDish} />
			</div>
		);
	}
}

export default Menu;
