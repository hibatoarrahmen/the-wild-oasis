import Button from "../ui/Button";
import FormRow from "../ui/FormRow";
import { HiPaperAirplane } from "react-icons/hi2";
import FormRowhorizantal from "../ui/FormRowhorizantal";
import FormRowVertical from "../ui/FormRowhorizantal";
import AiInput from "../ui/AiInput";

function Assistant() {
  return (
    <>
      <FormRowhorizantal>
        <AiInput />
        <Button>
          <HiPaperAirplane />
        </Button>
      </FormRowhorizantal>
    </>
  );
}

export default Assistant;
