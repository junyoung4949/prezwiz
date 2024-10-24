import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { FaPlus } from "react-icons/fa";
import HeadingText from "@/components/heading-text";
import Slide from "./slide";
import Cookies from "js-cookie";
import axios from 'axios';

// 슬라이드 데이터 타입 정의
interface Slide {
  title: string;
  description: string;
  slide_number: number;
}

// 서버로부터 응답받을 데이터 구조
interface SlideResponse {
  id: number;
  topic: string;
  createdAt: string; // LocalDateTime은 ISO 8601 문자열로 전송되므로 string 타입 사용
}


interface SlidesListProps {
  initialSlides: Slide[]; // 초기 슬라이드 데이터
  topic: string | null; // 전달받은 토픽
}

export default function SlidesList({ initialSlides, topic }: SlidesListProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false); // 로딩 상태
  const [slides, setSlides] = useState<Slide[]>(initialSlides); // 슬라이드 상태 관리
  const [isAdding, setIsAdding] = useState<boolean>(false); // 새로운 슬라이드 추가 여부
  const jwt = Cookies.get("authorization");

  // 슬라이드를 오름차순으로 정렬하는 함수
  const reorderSlides = (slides: Slide[]): Slide[] => {
    return slides.map((slide, index) => ({
      ...slide,
      slide_number: index + 1, // 1부터 오름차순으로 번호 부여
    }));
  };

  // 드래그 완료 후 순서 변경 처리
  const handleOnDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(slides);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setSlides(reorderSlides(items)); // 순서가 변경된 슬라이드 저장
  };

  const handleDeleteSlide = (slideNumber: number) => {
    const updatedSlides = slides.filter(slide => slide.slide_number !== slideNumber);
    setSlides(reorderSlides(updatedSlides)); // 삭제 후 슬라이드 번호 재정렬
  };

  const handleEditSlide = (slideNumber: number, updatedTitle: string, updatedDescription: string) => {
    const updatedSlides = slides.map(slide => {
      if (slide.slide_number === slideNumber) {
        return { ...slide, title: updatedTitle, description: updatedDescription };
      }
      return slide;
    });
    setSlides(reorderSlides(updatedSlides)); // 수정 후 슬라이드 번호 재정렬
    setIsAdding(false); // 새 슬라이드 추가 중지
  };

  const handleAddSlide = () => {
    setIsAdding(true); // 새로운 슬라이드 추가
  };

  // 슬라이드를 서버로 보내는 함수
  const handleSubmit = async () => {
    if (!topic) {
      console.error("Topic is missing");
      return;
    }
  
    setIsLoading(true); // 요청 시작 시 로딩 상태 true
  
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000 * 2); // 2분 타임아웃
  
    try {
      const response = await fetch("/api/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`, // JWT 토큰 추가
        },
        body: JSON.stringify({ slides, topic }), // 본문 데이터 직렬화
        signal: controller.signal, // AbortController의 signal 연결
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      // 응답을 SlideResponse 타입으로 처리
      const data: SlideResponse = await response.json();
  
      console.log("Response:", data); // 응답 데이터 출력
  
      // /store/{id}로 이동
      window.location.href = `/store/${data.id}`;
  
    } catch (error) {
      console.error("Request failed:", error); // 에러 처리
    } finally {
      clearTimeout(timeoutId); // 타임아웃 해제
      setIsLoading(false); // 요청 완료 시 로딩 상태 false
    }
  };  

  return (
    <div className="space-y-8">
      {isLoading ? (
        <div className="flex justify-center items-center">
          <h1>서비스 환경에 따라 몇분정도 소요될수 있습니다..</h1>
          <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>) : (
        <div>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="slides">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {slides.map((slide, index) => (
                    <Draggable key={slide.slide_number} draggableId={String(slide.slide_number)} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="mb-4" // 슬라이드 간격 추가
                        >
                          <Slide
                            slide_number={slide.slide_number}
                            title={slide.title}
                            description={slide.description}
                            onDelete={() => handleDeleteSlide(slide.slide_number)}
                            onEdit={(updatedTitle, updatedDescription) =>
                              handleEditSlide(slide.slide_number, updatedTitle, updatedDescription)
                            }
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

          {/* 새로운 슬라이드 추가 모드 */}
          {isAdding && (
            <Slide
              slide_number={slides.length + 1}
              title=""
              description=""
              onDelete={() => setIsAdding(false)} // 취소하면 슬라이드 추가 중지
              onEdit={(newTitle, newDescription) => {
                const newSlide: Slide = {
                  title: newTitle,
                  description: newDescription,
                  slide_number: slides.length + 1,
                };
                setSlides(reorderSlides([...slides, newSlide])); // 새로운 슬라이드 추가 후 정렬
                setIsAdding(false); // 추가 완료 후 추가 모드 종료
              }}
              isEditing={true} // 수정 모드로 시작
            />
          )}

          {/* 새로운 슬라이드를 추가하는 버튼 */}
          <div className="flex justify-center mt-4">
            <button
              onClick={handleAddSlide}
              className="bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center"
            >
              <FaPlus />
            </button>
          </div>

          {/* 생성 버튼 */}
          <div className="flex justify-center mt-8">
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white py-2 px-4 rounded-md"
            >
              생성
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
