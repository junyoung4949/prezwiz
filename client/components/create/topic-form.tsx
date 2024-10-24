import { useState } from "react";

interface TopicFormProps {
  onSubmit: (topic: string) => void; // 주제를 제출할 때 호출할 함수
}

export default function TopicForm({ onSubmit }: TopicFormProps) {
  const [topicInput, setTopicInput] = useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(topicInput); // 부모 컴포넌트로 주제 전달
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <label htmlFor="topicInput" className="text-lg font-medium">
        주제를 입력해주세요:
      </label>
      <input
        type="text"
        id="topicInput"
        value={topicInput}
        onChange={(e) => setTopicInput(e.target.value)}
        className="border border-gray-300 p-2 rounded-md"
        placeholder="예시: 수요와 공급"
        required
      />
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded-md"
      >
        Submit
      </button>
    </form>
  );
}
