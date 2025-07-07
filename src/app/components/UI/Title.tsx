export default function Title({ children }: { children: React.ReactNode }) {
	return (
		<h1><span className="text-5xl font-semibold text-yellow-500/25 bg-gradient-to-r from-yellow-500 to-orange-500 via-yellow-100 to-yellow-200 bg-clip-text text-transparent font-ubuntu group-hover:scale-105 transition-transform duration-300 ">{children}</span></h1>
	)
}
