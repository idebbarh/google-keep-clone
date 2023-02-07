import React from "react";
import { useAppDispatch } from "../../app/hooks";
import { changeParams } from "../../features/paramsSlice";
import { colorVariant } from "../../utils/colorVariant";
type TPropsSearchByColorContainer = {
  colors: Set<string>;
};
function SearchByColorContainer({ colors }: TPropsSearchByColorContainer) {
  const dispatch = useAppDispatch();
  return (
    <div className="bg-[#28292c] mt-8 mb-4 px-4 py-2 mx-auto max-w-[600px] shadow-sbcc text-main-text-color">
      <h3 className="mb-4 font-normal text-lg capitalize">color</h3>
      <div className="flex items-center gap-4 flex-wrap">
        {Array.from(colors).map((color) => (
          <div
            key={color}
            className={`rounded-full w-12 h-12 ${colorVariant[color]} border border-border-gray border-solid cursor-pointer hover:border-main-text-color`}
            onClick={() =>
              dispatch(changeParams({ paramName: "color", paramValue: color }))
            }
          ></div>
        ))}
      </div>
    </div>
  );
}
export default SearchByColorContainer;
