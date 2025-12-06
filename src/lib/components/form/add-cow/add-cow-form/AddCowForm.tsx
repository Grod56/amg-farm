import { ModeledVoidComponent } from "@mvc-react/components";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { AddCowFormModel } from "./add-cow-form-model";
import Spinner from "react-bootstrap/Spinner";

const AddCowForm = function ({ model }) {
	const { interact, modelView } = model;
	const { locations, cowTypes, fields, formNotifier } = modelView;
	const { name, type, tag, dob, location } = fields;
	const { notification } = formNotifier.modelView;
	const maxDate = Intl.DateTimeFormat("sv-SE").format(new Date());
	const locationsMap = new Map<string, string>(
		locations.map(location => [location.name, location.id]),
	);

	return (
		<>
			<Form
				className="flex flex-col gap-4"
				onSubmit={e => {
					e.preventDefault();
					formNotifier.interact({
						type: "NOTIFY",
						input: { notification: { type: "submitting" } },
					});
					interact({
						type: "SUBMIT",
						input: {
							cowToBeAdded: {
								name: name.trim(),
								dob,
								type,
								tag: tag.trim(),
								location,
							},
						},
					});
				}}
			>
				<div className="form-fields flex flex-col">
					<Form.Control
						type="text"
						placeholder="Name"
						required
						defaultValue={name}
						onChange={e =>
							interact({
								type: "UPDATE_FORM",
								input: {
									updatedFormFields: {
										...fields,
										name: e.target.value,
									},
								},
							})
						}
					/>
					<br />
					<Form.Select
						defaultValue={type}
						required
						onChange={e =>
							interact({
								type: "UPDATE_FORM",
								input: {
									updatedFormFields: {
										...fields,
										type: e.target.value,
									},
								},
							})
						}
					>
						{[
							...cowTypes.map((cowType, index) => (
								<option key={index}>{cowType.type}</option>
							)),
						]}
					</Form.Select>
					<br />
					<Form.Control
						type="text"
						placeholder="Tag"
						defaultValue={tag}
						onChange={e =>
							interact({
								type: "UPDATE_FORM",
								input: {
									updatedFormFields: {
										...fields,
										tag: e.target.value,
									},
								},
							})
						}
					/>
					<br />
					<Form.Control
						type="date"
						placeholder="Date of Birth"
						required
						defaultValue={Intl.DateTimeFormat("sv-SE").format(dob)} // TODO: eww...
						max={maxDate}
						onChange={e =>
							interact({
								type: "UPDATE_FORM",
								input: {
									updatedFormFields: {
										...fields,
										dob: new Date(e.target.value),
									},
								},
							})
						}
					/>
					<br />
					<Form.Select
						required
						defaultValue={location.name}
						onChange={e =>
							interact({
								type: "UPDATE_FORM",
								input: {
									updatedFormFields: {
										...fields,
										location: {
											id: locationsMap.get(
												e.target.value,
											)!,
											name: e.target.value,
										},
									},
								},
							})
						}
					>
						{[
							...locations.map(location => (
								<option key={location.id}>
									{location.name}
								</option>
							)),
						]}
					</Form.Select>
				</div>
				{notification?.type == "failure" && (
					<span className="text-red-800 text-center">
						{notification.text}
					</span>
				)}
				<div className="flex gap-2 justify-end">
					<Button
						className="bg-gray-800! hover:bg-gray-900! text-white border-none! text-center"
						type="submit"
						disabled={notification?.type == "submitting"}
					>
						{notification?.type == "submitting" ? (
							<Spinner
								animation="border"
								color="white"
								className="size-6!"
							/>
						) : (
							"Add Cow"
						)}
					</Button>
				</div>
			</Form>
		</>
	);
} as ModeledVoidComponent<AddCowFormModel>;

export default AddCowForm;
