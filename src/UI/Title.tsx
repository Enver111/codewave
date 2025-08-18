export default function Title({ title }: { title: string }) {
  return (
    <h1 className="inline text-[48px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#003aff] via-[#00efff] to-[#003aff] ">
      {title}
    </h1>
  );
}
