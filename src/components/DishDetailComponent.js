import React, { Component } from "react";
import {
	Card,
	CardImg,
	CardImgOverlay,
	CardText,
	CardBody,
	CardTitle,
} from "reactstrap";

class SelectedDish extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		if (this.props.selectedDish != null) {
			const comments = this.props.selectedDish.comments.map((comment) => {
				return (
					<div key={comment.id}>
						<p>{comment.comment}</p>
						<p>
							-- {comment.author} , {comment.date}
						</p>
					</div>
				);
			});
			return (
				<div className="row">
					<div className="col-12 col-md-5 m-1">
						<Card>
							<CardImg
								top
								src={this.props.selectedDish.image}
								alt={this.props.selectedDish.name}
							/>
							<CardBody>
								<CardTitle>{this.props.selectedDish.name}</CardTitle>
								<CardText>{this.props.selectedDish.description}</CardText>
							</CardBody>
						</Card>
					</div>
					<div className="col-12 col-md-5 m-1">
						<h2>Comments</h2>
						{comments}
					</div>
				</div>
			);
		} else return <div></div>;
	}
}

export default SelectedDish;
