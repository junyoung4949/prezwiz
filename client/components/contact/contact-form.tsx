"use client";

import * as React from "react";
import { useState } from "react";
import Cookies from "js-cookie";

interface MessageBody {
  message: string;
}

export default function ContactForm() {
  const [message, setMessage] = useState("");
  const jwt = Cookies.get("authorization");
  const url = "/api/contact"

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    // message가 공백만 있는지 확인하고, 공백만 있을 경우 전송하지 않음
    const trimmedMessage = message.trim();
  
    if (trimmedMessage === "") {
      console.error("빈 메세지는 전송할수 없습니다.");
      return;
    }
  
    // 전송할 메시지 객체 생성
    const messageBody: MessageBody = {
      message: trimmedMessage,
    };
  
    // POST 요청으로 message를 전송
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(messageBody), // 메시지 전송
    })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === "success") {
        alert(data.message);
        window.location.reload()
      } else {
        alert(data.message)
      }
    })
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4 mb-8">
      <div>
        <textarea
          id="message"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="메세지를 입력해주세요"
          className="w-full h-48 p-3 text-sm border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          style={{ minHeight: "500px" }}
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded-md"
      >
        Submit
      </button>
    </form>
  );
}