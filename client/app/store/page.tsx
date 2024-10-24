"use client";

import { useEffect, useState } from "react";
import Link from "next/link"; // Link 컴포넌트 import
import HeadingText from "@/components/heading-text";
import UnauthorizedDialog from "@/components/auth/unauthorized-dialog";
import Cookies from "js-cookie";

// JSON 데이터 타입 정의
interface Topic {
  id: number;
  topic: string;
  createdAt: string;
}

export default function TopicGrid() {
  const [topicList, setTopicList] = useState<Array<Topic>>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const jwt = Cookies.get("authorization");

  // 데이터 가져오기
  useEffect(() => {
    const fetchTopics = () => {
      fetch("/api/store", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } else {
            setIsError(true);
          }
        })
        .then((data) => {
          setTopicList(data);
        });
    };
    fetchTopics();
  }, []);

  // 날짜 형식 변환 함수 (YYYY-MM-DD)
  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <main className="container flex flex-col items-center py-8">
      <HeadingText subtext="주제를 선택해 주세요">주제 목록</HeadingText>
      <div className="mt-8 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {isError && <UnauthorizedDialog />}

        {!isError &&
          topicList.map((topic) => (
            <Link 
              key={topic.id} 
              href={`/store/${topic.id}`} 
              className="border p-4 rounded shadow hover:shadow-lg transition cursor-pointer"
            >
              <h2 className="text-xl font-bold">{topic.topic}</h2>
              <p className="text-gray-500">작성일: {formatDate(topic.createdAt)}</p>
            </Link>
          ))}
      </div>
    </main>
  );
}