export default function MainBtn({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      className={`flex items-center gap-[20px] bg-gradient-to-r from-[#FFCD00] to-[#FFB500]  rounded-[20px] border-2 border-white hover:border-[#ffe500] py-[15px] px-[30px] ${className} transition-all duration-300 group
	  shadow-[4px_4px_4px_0px_rgba(0,0,0,0.25)]`}
    >
      <span className="text-[30px] font-medium text-white">{children}</span>
      <img
        src="/Rocket.webp"
        alt="rocket"
        className="w-[40px] transition-all duration-500 rotate-[-45deg]  group-hover:rotate-12 "
      />
    </button>
  );
}
