import Button from "../UI/Button";

export default function Header() {
  return (
    <section className="fixed top-0 left-0 right-0 z-50 w-[1366px] mx-auto">
      <div className="flex justify-between items-center p-[15px] rounded-tl-none rounded-tr-none rounded-bl-[40px] rounded-br-[40px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] bg-white">
        <button className="flex items-center gap-2 hover:scale-105 transition-all duration-300">
          <img
            src="/codewave_log_nbg.webp"
            alt="CodeWave"
            className="w-[60px]"
          />
          <span className="text-2xl font-bold bg-gradient-to-r from-[#003aff] via-[#00efff] to-[#003aff] text-transparent bg-clip-text">
            CodeWave
          </span>
        </button>
        <div className="flex items-center gap-4">
          <Button
            className="hover:bg-gray-200 hover:text-black transition-200 duration-200 text-lg p-2 rounded-md"
            onClick={() => {}}
          >
            Услуги
          </Button>
          <Button
            className="bg-gradient-to-r from-[#ffb500] via-[#ffe500] to-[#ffb500] text-transparent bg-clip-text hover:scale-105 transition-all duration-300 text-lg p-2 rounded-md"
            onClick={() => {}}
          >
            Дизайн
          </Button>
          <Button
            className="hover:bg-gray-200 hover:text-black transition-200 duration-200 text-lg p-2 rounded-md"
            onClick={() => {}}
          >
            Портфолио
          </Button>
          <Button
            className="hover:bg-gray-200 hover:text-black transition-200 duration-200 text-lg p-2 rounded-md"
            onClick={() => {}}
          >
            Отзывы
          </Button>
          <Button
            className="hover:bg-gray-200 hover:text-black transition-200 duration-200 text-lg p-2 rounded-md"
            onClick={() => {}}
          >
            О нас
          </Button>
          <Button
            className="hover:bg-gray-200 hover:text-black transition-200 duration-200 text-lg p-2 rounded-md"
            onClick={() => {}}
          >
            Контакты
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button
            className="hover:bg-gray-200 hover:text-black transition-200 duration-200 text-lg p-2 rounded-md"
            onClick={() => {}}
          >
            <img className="w-[40px]" src="/theme.webp" alt="Theme" />
          </Button>
          <Button
            className="hover:bg-gray-200 hover:text-black transition-200 duration-200 text-lg p-2 rounded-md"
            onClick={() => {}}
          >
            <img className="w-[40px]" src="/logIn.webp" alt="Lanlogin" />
          </Button>
        </div>
      </div>
    </section>
  );
}
