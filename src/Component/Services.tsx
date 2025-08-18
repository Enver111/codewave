import Title from "../UI/Title";
import Card from "../UI/Card";
import Form from "../UI/Form";

export default function Services() {
  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-t from-[#E4F1EC] to-[#E4F1EC] to-[#E8F2FC] ">
      <Title title="Услуги" />
      <div className="flex items-center justify-center gap-[70px] mt-[60px]">
        <Card />
        <Form />
      </div>
    </div>
  );
}
