import HeadingText from "@/components/heading-text"
import ContactForm from "@/components/contact/contact-form"
// import Cookies from "js-cookie" // 필요에 따라 사용

export default function Contact() {
  return (
    <main className="container flex flex-col py-8">
      <HeadingText subtext="궁금한 점이 있으시면 언제든지 문의해주세요">
        Contact
      </HeadingText>
      <ContactForm />
    </main>
  )
}