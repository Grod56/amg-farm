import { ModeledVoidComponent } from "@mvc-react/components";
import { HeaderModel } from "./header-model";
import Link from "next/link";

const Header = function ({ model }) {
	const { headerTitle } = model.modelView;

	return (
		<div className="sticky top-0 flex px-6 py-4 bg-gray-950 text-white">
			<div className="flex flex-wrap gap-4 items-center w-full justify-between">
				<Link
					href="/"
					className="text-decoration-none text-white content-center text-2xl"
				>
					{headerTitle}
				</Link>
				<div className="flex gap-4 items-center">
					<a
						className="text-decoration-none uppercase text-sm text-white hover:text-amber-200"
						href={`/livestock`}
					>
						Livestock
					</a>
					<a
						className="text-decoration-none uppercase text-sm text-white hover:text-amber-200"
						href={`/api/register`}
						target="_blank"
						rel="noreferrer"
					>
						Generate Register
					</a>
				</div>
			</div>
		</div>
	);
} as ModeledVoidComponent<HeaderModel>;

export default Header;
