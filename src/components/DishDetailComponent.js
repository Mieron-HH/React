import React, { Component } from "react";
import {
	Card,
	CardImg,
	CardText,
	CardBody,
	CardTitle,
	Media,
} from "reactstrap";

class DishDetail extends Component {
	renderDish(SelectedDish) {
		return (
			<Card>
				<CardImg top src={SelectedDish.image} alt={SelectedDish.name} />
				<CardBody>
					<CardTitle>{SelectedDish.name}</CardTitle>
					<CardText>{SelectedDish.description}</CardText>
				</CardBody>
			</Card>
		);
	}
	renderComments(Comments) {
		if (Comments != null) {
			const comment_details = Comments.map((comment) => {
				return (
					<Media key={comment.id} tag="li">
						<p>{comment.comment}</p>
						<p>
							-- {comment.author} ,{" "}
							{new Intl.DateTimeFormat("en-US", {
								year: "numeric",
								month: "short",
								day: "2-digit",
							}).format(new Date(Date.parse(comment.date)))}
						</p>
					</Media>
				);
			});

			return (
				<div>
					<h4>Comments</h4>
					{comment_details}
				</div>
			);
		} else {
			return <div></div>;
		}
	}
	render() {
		const SelectedDish = this.props.dish;
		if (SelectedDish != null) {
			return (
				<div className="container mb-2">
					<div className="row">
						<div className="col-12 col-md-5 m-1">
							{this.renderDish(SelectedDish)}
						</div>
						<div className="col-12 col-md-5 m-1">
							<Media list className="list-unstyled">
								{this.renderComments(SelectedDish.comments)}
							</Media>
						</div>
					</div>
				</div>
			);
		} else {
			return <div></div>;
		}
	}
}

export default DishDetail;
