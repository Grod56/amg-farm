import { ModeledVoidComponent } from "@mvc-react/components";
import { HeaderModel } from "./header-model";
import Link from "next/link";
import Image from "next/image";
import AuthWidget from "./auth-widget/AuthWidget";

const Header = function ({ model }) {
	const { headerTitle } = model.modelView;

	return (
		<div className="sticky shadow top-0 flex px-6 py-4 bg-gray-900 text-white md:px-9">
			<div className="flex flex-col align-center items-center w-full gap-3 md:flex-row md:flex-wrap md:justify-between md:gap-4">
				<div className="logo">
					<Link
						href="/"
						className="inline-flex gap-2 items-center text-decoration-none text-white content-center focus-visible:outline-none"
					>
						<Image
							alt="logo"
							src="/logo.svg"
							width={48}
							height={48}
						/>
						<span className="text-2xl content-center font-serif">
							{headerTitle}
						</span>
					</Link>
				</div>
				<div className="px-3 flex gap-4 items-center text-center">
					<Link
						className="text-decoration-none uppercase text-sm text-white hover:text-orange-300!"
						href={`/livestock`}
					>
						Livestock
					</Link>
					<Link
						className="text-decoration-none uppercase text-sm text-white hover:text-orange-300!"
						href={`/register`}
						target="_blank"
					>
						Get Register
					</Link>
					<AuthWidget />
				</div>
			</div>
		</div>
	);
} as ModeledVoidComponent<HeaderModel>;

export default Header;
