"use client";
import Link from "next/link";
export default function Footer() {
  const d = new Date();
  return (
    <>
      <footer>
        <section className="footer-section flex items-center justify-center max-w-screen-xl mx-auto p-4 text-center">
          <p className="mb-0">جميع الحقوق محفوظة لشركة الإخاء العربية &copy; {d.getFullYear()}</p>
        </section>
      </footer>
    </>
  );
}
