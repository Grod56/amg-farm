import { ModeledVoidComponent } from "@mvc-react/components";
import { AuthWidgetDropdownModel } from "./auth-widget-dropdown-model";
import Dropdown from "react-bootstrap/NavDropdown";

const AuthWidgetDropdown = function ({ model }) {
	const { interact, modelView } = model;
	const { user } = modelView;

	return (
		<Dropdown
			className="uppercase text-sm text-white hover:text-orange-300!"
			title={`Hello, ${user.name.split(" ")[0]}`}
			menuVariant="dark"
		>
			<Dropdown.Item
				className="capitalize text-white text-sm"
				onClick={() => {
					interact({
						type: "SIGN_OUT",
					});
				}}
			>
				Sign Out
			</Dropdown.Item>
		</Dropdown>
	);
} as ModeledVoidComponent<AuthWidgetDropdownModel>;

export default AuthWidgetDropdown;
