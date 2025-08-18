import { achievements } from "../../data/data";
import Title from "../UI/Title";

export default function Achievements() {
  return (
    <div className="bg-[#e8f2fc] py-[50px] flex flex-col items-center justify-center">
      <Title title="Наши достижения" />
      <div className="flex items-center justify-center gap-[70px] mt-[60px]">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className="flex flex-col items-center justify-center gap-[10px]"
          >
            <img
              src={achievement.image}
              alt={achievement.description}
              className="w-[80px]"
            />
            <h2
              className="text-[30px] font-bold"
              style={{ color: achievement.color }}
            >
              {achievement.number}
            </h2>
            <p className="text-[24px] text-[#535353] font-medium">
              {achievement.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
