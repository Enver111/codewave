export default function Main() {
  return (
    <div className="flex items-center justify-center gap-[45px] py-[140px] bg-gradient-to-t from-[#e8f2fc] to-[#e8f2fc00]">
      <div>
        <h1 className="text-[64px] font-bold">
          <span className="bg-gradient-to-r from-[#003aff] via-[#00efff] to-[#003aff] text-transparent bg-clip-text">
            CodeWave —
          </span>{" "}
          <br />
          мощь веб-решений
        </h1>
        <span className="text-[24px]">
          Создаем современные и <br /> эффективные веб-сайты и приложения,{" "}
          <br /> которые двигают бизнес вперед.
        </span>
      </div>
      <div>
        <img src="/vsCode.svg" alt="vsCode" />
      </div>
    </div>
  );
}
