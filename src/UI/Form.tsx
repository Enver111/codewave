import MainBtn from "./MainBtn";

export default function Form() {
  return (
    <div className="flex flex-col items-left justify-left w-[630px] h-[768px] bg-[#FFCDCD] bg-opacity-[0.22] shadow-[4px_4px_4px_0px_rgba(0,0,0,0.25)] rounded-[20px] pt-[30px] px-[50px]">
      <div className="flex items-center gap-[10px]">
        <img src="/codewave_log_nbg.webp" alt="codewave" className="w-[60px]" />
        <span className="bg-gradient-to-r from-[#003aff] via-[#00efff] to-[#003aff] text-transparent bg-clip-text text-[24px] font-bold">
          CodeWave
        </span>
      </div>

      <h1 className="text-[30px] font-bold text-left text-[#535353] my-[25px]">
        Оставить заяавку
      </h1>
      <div className="flex items-left flex-col gap-[10px]">
        <span className="text-[20px] font-medium text-left text-[#535353]">
          Имя
        </span>
        <input
          type="text"
          placeholder="Ivan"
          className="w-[200px] h-[30px] rounded-[20px] p-[23px] bg-white w-full placeholder:text-[#535353] placeholder:text-[20px] placeholder:font-medium"
        />
      </div>
      <div className="flex items-left flex-col gap-[10px] pt-[25px]">
        <span className="text-[20px] font-medium text-left text-[#535353]">
          Номер телефона
        </span>
        <input
          type="tel"
          placeholder="+7 (999) 999-99-99"
          className="w-[200px] h-[30px] rounded-[20px] p-[23px] bg-white w-full placeholder:text-[#535353] placeholder:text-[20px] placeholder:font-medium"
        />
      </div>
      <div className="flex items-left flex-col gap-[10px] pt-[25px]">
        <span className="text-[20px] font-medium text-left text-[#535353]">
          Email
        </span>
        <input
          type="email"
          placeholder="example@mail.com"
          className="w-[200px] h-[30px] rounded-[20px] p-[23px] bg-white w-full placeholder:text-[#535353] placeholder:text-[20px] placeholder:font-medium"
        />
      </div>
      <div className="flex items-left flex-col gap-[10px] py-[25px]">
        <span className="text-[20px] font-medium text-left text-[#535353]">
          Сообщение
        </span>
        <textarea
          placeholder="Сообщение..."
          className="h-[100px] rounded-[20px] p-[23px] bg-white w-full placeholder:text-[#535353] placeholder:text-[20px] placeholder:font-medium"
        />
      </div>
      <MainBtn className="w-[380px] self-center">Отправить заявку</MainBtn>
    </div>
  );
}
