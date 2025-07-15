import { ModeledVoidComponent } from "@mvc-react/components";
import { HeaderModel } from "./header-model";

const Header = function ({ model }) {
	const { headerTitle } = model.modelView;

	return (
		<div className="flex px-6 py-4 bg-gray-950">
			<div className="flex gap-4 items-center">
				<span className="content-center text-2xl">{headerTitle}</span>
			</div>
		</div>
	);
} as ModeledVoidComponent<HeaderModel>;

export default Header;
