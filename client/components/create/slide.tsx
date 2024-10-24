import { useState } from "react";
import { FaTrash, FaEdit, FaSave } from "react-icons/fa";

interface SlideProps {
  slide_number: number;
  title: string;
  description: string;
  onDelete: () => void;
  onEdit: (updatedTitle: string, updatedDescription: string) => void;
  isEditing?: boolean; // 새 슬라이드를 추가할 때 수정 모드로 시작
}

export default function Slide({ slide_number, title, description, onDelete, onEdit, isEditing = false }: SlideProps) {
  const [isEditingState, setIsEditing] = useState<boolean>(isEditing); // 수정 모드 여부
  const [editTitle, setEditTitle] = useState<string>(title); // 수정 중인 제목
  const [editDescription, setEditDescription] = useState<string>(description); // 수정 중인 설명

  const handleSave = () => {
    onEdit(editTitle, editDescription); // 부모 컴포넌트에 수정된 값 전달
    setIsEditing(false); // 수정 모드 종료
  };

  return (
    <div className="border p-4 rounded-md flex justify-between items-start">
      {isEditingState ? (
        <div className="flex-1">
          {/* 수정 모드: 제목과 설명을 입력할 수 있음 */}
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="border p-2 rounded-md w-full mb-2"
            placeholder="슬라이드 제목"
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            className="border p-2 rounded-md w-full"
            placeholder="슬라이드 설명"
          />
          <button
            onClick={handleSave}
            className="bg-green-500 text-white mt-2 p-2 rounded-md flex items-center"
          >
            <FaSave className="mr-2" />
            저장
          </button>
        </div>
      ) : (
        <div className="flex-1">
          {/* 보기 모드: 제목과 설명 표시 */}
          <p className="text-sm text-gray-500 mt-2">Slide {slide_number}</p>
          <h2 className="text-2xl font-bold">{title}</h2>
          <p className="text-gray-700 mt-2">{description}</p>
        </div>
      )}
      <div className="flex space-x-2">
        {!isEditingState && (
          <>
            <button
              onClick={() => setIsEditing(true)} // 수정 모드로 변경
              className="text-blue-500 p-1"
            >
              <FaEdit />
            </button>
            <button onClick={onDelete} className="text-red-500 p-1">
              <FaTrash />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
