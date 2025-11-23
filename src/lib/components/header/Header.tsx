import { ModeledVoidComponent } from "@mvc-react/components";
import { HeaderModel } from "./header-model";
import Link from "next/link";
import Image from "next/image";

const Header = function ({ model }) {
	const { headerTitle } = model.modelView;

	return (
		<div className="sticky top-0 flex px-6 py-4 bg-gray-950 text-white md:px-9">
			<div className="flex flex-col align-center items-center w-full gap-3 md:flex-row md:flex-wrap md:justify-between md:gap-4">
				<div className="logo">
					<Link
						href="/"
						className="inline-flex gap-2 items-center text-decoration-none text-white content-center"
					>
						<Image
							alt="logo"
							src="/logo.svg"
							width={48}
							height={48}
						/>
						<span className="text-2xl content-center">
							{headerTitle}
						</span>
					</Link>
				</div>
				<div className="flex gap-4 items-center">
					<a
						className="text-decoration-none uppercase text-sm text-white hover:text-amber-200"
						href={`/livestock`}
					>
						Livestock
					</a>
					<a
						className="text-decoration-none uppercase text-sm text-white hover:text-amber-200"
						href={`/register`}
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
