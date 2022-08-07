import { ImSpinner2 } from "react-icons/im";
function Spinner() {
  return (
    <div className="flex items-cente justify-cente">
      <ImSpinner2 className="mx-auto animate-spin text-violet-700 text-4xl mt-[300px]" />
    </div>
  );
}

export default Spinner;
