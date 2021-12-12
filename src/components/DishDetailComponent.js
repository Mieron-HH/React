import React from "react";
import {
	Card,
	CardImg,
	CardText,
	CardBody,
	CardTitle,
	Media,
} from "reactstrap";

function RenderDish({ dish }) {
	return (
		<Card>
			<CardImg top src={dish.image} alt={dish.name} />
			<CardBody>
				<CardTitle>{dish.name}</CardTitle>
				<CardText>{dish.description}</CardText>
			</CardBody>
		</Card>
	);
}

function RenderComments({ Comments }) {
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

const DishDetail = (props) => {
	const SelectedDish = props.dish;
	if (SelectedDish != null) {
		return (
			<div className="container mb-2">
				<div className="row">
					<div className="col-12 col-md-5 m-1">
						<RenderDish dish={SelectedDish} />
					</div>
					<div className="col-12 col-md-5 m-1">
						<Media list className="list-unstyled">
							<RenderComments Comments={SelectedDish.comments} />
						</Media>
					</div>
				</div>
			</div>
		);
	} else {
		return <div></div>;
	}
};

export default DishDetail;
