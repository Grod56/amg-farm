export default function Home() {
	return (
		<main className="w-full h-full grow flex items-center">
			<div className="flex w-full h-full items-center justify-center gap-8">
				<button
					className="p-8 bg-gray-950 cursor-pointer rounded-2xl text-white"
					onClick={() => window.open("livestock")}
				>
					Livestock
				</button>
				<button className="p-8 bg-gray-950 cursor-pointer rounded-2xl text-white">
					Register
				</button>
			</div>
		</main>
	);
}
