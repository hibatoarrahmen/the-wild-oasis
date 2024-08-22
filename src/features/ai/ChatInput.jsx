import { HiPaperAirplane } from "react-icons/hi2";
import Button from "../../ui/Button";
import FormRowhorizantal from "../../ui/FormRowhorizantal";
import AiInput from "../../ui/AiInput";

import { useState } from "react";
import Form from "../../ui/Form";

function ChatInput({ setChatInput }) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      setChatInput(message);

      setMessage("");
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <FormRowhorizantal>
        <AiInput
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here..."
        />
        <Button type="submit ">
          <HiPaperAirplane />
        </Button>
      </FormRowhorizantal>
    </Form>
  );
}

export default ChatInput;
