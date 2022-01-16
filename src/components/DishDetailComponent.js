import React, { Component } from "react";
import {
	Card,
	CardImg,
	CardText,
	CardBody,
	CardTitle,
	Breadcrumb,
	BreadcrumbItem,
	Button,
	Modal,
	ModalBody,
	Row,
	Col,
	Label,
} from "reactstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { Control, LocalForm, Errors } from "react-redux-form";

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
				<li key={comment.id}>
					<p>{comment.comment}</p>
					<p>
						-- {comment.author} ,{" "}
						{new Intl.DateTimeFormat("en-US", {
							year: "numeric",
							month: "short",
							day: "2-digit",
						}).format(new Date(Date.parse(comment.date)))}
					</p>
				</li>
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

class CommentForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			show: false,
		};

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(values) {
		console.log("Current State is: " + JSON.stringify(values));
		alert("Current State is: " + JSON.stringify(values));
		this.setState({
			show: !this.state.show,
		});
	}

	render() {
		const toggleModal = () => {
			this.setState({
				show: !this.state.show,
			});
		};

		const required = (val) => val && val.length;
		const maxLength = (len) => (val) => !val || val.length <= len;
		const minLength = (len) => (val) => val && val.length >= len;

		return (
			<div>
				<Modal isOpen={this.state.show} size="md">
					<div class="modal-header">
						<h4 class="modal-title" style={{ fontWeight: "bold" }}>
							Submit Comment
						</h4>
						<i
							className="fa fa-close ms-auto"
							style={{ color: "#0000007a" }}
							onClick={toggleModal}
						></i>
					</div>

					<ModalBody>
						<LocalForm onSubmit={(values) => this.handleSubmit(values)}>
							<Row className="form-group mb-3">
								<Label htmlFor="rating" sm={12} style={{ fontWeight: "bold" }}>
									Rating
								</Label>
								<Col sm={12}>
									<Control.select
										model=".rating"
										id="rating"
										name="rating"
										className="form-control"
									>
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
									</Control.select>
								</Col>
							</Row>

							<Row className="form-group mb-3">
								<Label htmlFor="author" sm={12} style={{ fontWeight: "bold" }}>
									Your Name
								</Label>
								<Col sm={12}>
									<Control.text
										model=".author"
										id="author"
										name="author"
										className="form-control"
										placeholder="Your Name"
										validators={{
											required,
											minLength: minLength(3),
											maxLength: maxLength(15),
										}}
									></Control.text>
									<Errors
										className="text-danger"
										model=".author"
										show="touched"
										messages={{
											required: "Required* ",
											minLength: "Must be greater than 2 characters ",
											maxLength: "Must be 15 characters or less ",
										}}
									/>
								</Col>
							</Row>

							<Row className="form-group mb-3">
								<Label htmlFor="comment" sm={12} style={{ fontWeight: "bold" }}>
									Comment
								</Label>
								<Col sm={12}>
									<Control.textarea
										model=".comment"
										id="comment"
										name="comment"
										className="form-control"
										rows="6"
									></Control.textarea>
								</Col>
							</Row>

							<Row className="form-group mb-3">
								<Col sm={{ size: 12 }}>
									<Button type="submit" color="primary">
										Submit
									</Button>
								</Col>
							</Row>
						</LocalForm>
					</ModalBody>
				</Modal>

				<button className="submit-comment" onClick={toggleModal}>
					<FontAwesomeIcon icon={faPencilAlt} /> Submit Comment
				</button>
			</div>
		);
	}
}

const DishDetail = (props) => {
	if (props.dish != null) {
		return (
			<div className="container mb-2">
				<div className="row">
					<Breadcrumb>
						<BreadcrumbItem>
							<Link to="/menu">Menu</Link>
						</BreadcrumbItem>
						<BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
					</Breadcrumb>
					<div className="col-12">
						<h3>{props.dish.name}</h3>
						<hr />
					</div>
				</div>
				<div className="row">
					<div className="col-12 col-md-5 m-1">
						<RenderDish dish={props.dish} />
					</div>
					<div className="col-12 col-md-5 m-1">
						<ul className="list-unstyled">
							<RenderComments Comments={props.comments} />
							<CommentForm />
						</ul>
					</div>
				</div>
			</div>
		);
	} else {
		return <div></div>;
	}
};

export default DishDetail;
