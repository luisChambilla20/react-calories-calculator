type ViewCaloriesProps = {
  counter: number;
  text: string;
};

export const ViewCalories = ({ counter, text }: ViewCaloriesProps) => {
  return (
    <p className="text-white font-bold rounded-full grid grid-cols-1 gap-3 text-center">
      <span className="text-7xl font-black text-orange-500 ">{counter}</span>
      {text}
    </p>
  );
};
