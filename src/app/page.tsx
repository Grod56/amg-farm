"use client";

export default function Home() {
	return (
		<main className="w-full grow flex items-center">
			<div className="w-full p-8 md:p-12">
				<div className="w-full h-full flex items-center bg-white/90 rounded-3xl p-12 md:p-14">
					<div className="flex flex-col gap-6 justify-center md:flex-nowrap">
						<div className="md:max-w-2/4">
							<span className="text-4xl md:text-5xl/normal font-serif">
								Welcome to the AMG Farm Manager
							</span>
						</div>
						<div className="text-base flex flex-col w-full h-full gap-6">
							<div className="flex flex-col gap-1">
								<p className="md:max-w-2/4">
									View livestock and perform realtime edits,
									additions and deletions to livestock
									records. Generate up-to-date register
									instantly in PDF form for storage or
									printing.
								</p>
								<div className="flex gap-3">
									<button
										className="p-3 px-4 bg-gray-800 cursor-pointer !rounded-lg overflow-clip w-fit text-white"
										onClick={() =>
											window.open("/livestock", "_self")
										}
									>
										Livestock
									</button>
									<button
										className="p-3 px-4 bg-gray-800 cursor-pointer !rounded-lg overflow-clip w-fit text-white"
										onClick={() =>
											window.open("/register", "_blank")
										}
									>
										Register
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
