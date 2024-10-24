"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // useParams 사용
import UnauthorizedDialog from "@/components/auth/unauthorized-dialog";
import HeadingText from "@/components/heading-text"
import Cookies from "js-cookie";

// JSON 데이터 타입 정의
interface Topic {
  id: number;
  topic: string;
  createdAt: string;
}

export default function TopicDetail() {
  const { id } = useParams(); // 동적 라우트 파라미터 추출
  const [topic, setTopic] = useState<Topic | null>(null);
  const [isError, setIsError] = useState<boolean>(false);
  const jwt = Cookies.get("authorization");

  // 서버에서 데이터 가져오기
  useEffect(() => {
    if (!id) return; // id가 없으면 아무 작업도 하지 않음

    const fetchTopic = async () => {
      try {
        const response = await fetch(`/api/store/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        });

        if (response.status === 200) {
          const data = await response.json();
          setTopic(data);
        } else {
          setIsError(true);
        }
      } catch (error) {
        console.error("Error fetching topic:", error);
        setIsError(true);
      }
    };

    fetchTopic();
  }, [id]);

  if (isError) {
    return <UnauthorizedDialog />;
  }

  if (!topic) {
    return <p>Loading...</p>;
  }

  // 날짜 형식 변환 함수 (YYYY-MM-DD)
  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // 다운로드 버튼 클릭 이벤트
  const downloadPPT = async () => {
    try {
      const response = await fetch(`/api/store/${id}/slide`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwt}`, // 필요한 경우 JWT 토큰 포함
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to download PPT");
      }
  
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
  
      const a = document.createElement("a");
      a.href = url;
      a.download = `slide_${topic.topic}.pptx`; // 파일명 지정
      document.body.appendChild(a);
      a.click();
  
      // 메모리 해제
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading PPT:", error);
      alert("PPT 다운로드에 실패했습니다.");
    }
  };

  const downloadScript = async () => {
    try {
      const response = await fetch(`/api/store/${id}/script`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwt}`, // JWT 토큰 전달
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to download script");
      }
  
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
  
      const a = document.createElement("a");
      a.href = url;
      a.download = `script_${topic.topic}.txt`; // 파일명 지정
      document.body.appendChild(a);
      a.click();
  
      // 메모리 해제
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading script:", error);
      alert("Script 다운로드에 실패했습니다.");
    }
  };
  

  return (
    <main className="container flex flex-col items-center py-8">
      <HeadingText>{topic.topic}</HeadingText>
      <p className="text-gray-500">작성일: {formatDate(topic.createdAt)}</p>

      <div className="mt-8 flex gap-4">
        <button
          onClick={downloadPPT}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Download PPT
        </button>
        <button
          onClick={downloadScript}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          Download Script
        </button>
      </div>
    </main>
  );
}
