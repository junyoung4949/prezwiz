import { useState } from "react";
import Cookies from "js-cookie";
import TopicForm from "./topic-form";
import SlidesList from "./slides-list";

// 슬라이드 데이터 타입 정의
interface Slide {
  title: string;
  description: string;
  slide_number: number;
}

export default function CreateForm() {
  const [slides, setSlides] = useState<Slide[] | null>(null); // 슬라이드 데이터 상태
  const [topic, setTopic] = useState<string | null>(null); // 선택한 토픽 상태
  const [isLoading, setIsLoading] = useState<boolean>(false); // 로딩 상태
  const jwt = Cookies.get("authorization");

  const handleCreateContents = async (topic: string) => {
    setIsLoading(true); // 요청 시작 시 로딩 상태 true
    setTopic(topic); // 토픽 저장

    const response = await fetch("/api/contents", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({ topic }),
    });

    if (response.ok) {
      const data: { slides: Slide[] } = await response.json();
      setSlides(data.slides); // 받은 슬라이드를 상태에 저장
    } else {
      console.error("Failed to fetch slides");
    }

    setIsLoading(false); // 요청 완료 시 로딩 상태 false
  };

  return (
    <div className="flex flex-col space-y-8">
      {isLoading ? (
        <div className="flex justify-center items-center">
          <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : slides === null ? (
        <TopicForm onSubmit={handleCreateContents} />
      ) : (
        <SlidesList initialSlides={slides} topic={topic} />
      )}
    </div>
  );
}
