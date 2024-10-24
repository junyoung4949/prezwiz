"use client"

import HeadingText from "@/components/heading-text"
import CreateForm from "@/components/create/create-form"

export default function Create() {
  return (
    <main className="container flex flex-col py-8">
      <HeadingText subtext="새로운 발표자료를 생성합니다.">
        Create
      </HeadingText>
      <CreateForm />
    </main>
  )
}
