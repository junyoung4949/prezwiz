"use client";

import Link from "next/link"
import { siteConfig } from "@/config/metadata"
import { navLinks } from "@/config/navlinks"
import { useAuth } from "@/components/auth/authcontext"

export default function Footer() {
  const { loggedin } = useAuth();

  return (
    <footer className="mt-auto">
      <div className="mx-auto w-full max-w-screen-xl p-6 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link href="/">
            <h1 className="mb-2 text-2xl font-bold sm:mb-0">
              {siteConfig.name}
            </h1>
          </Link>
          {loggedin && <ul className="mb-6 flex flex-wrap items-center text-primary opacity-60 sm:mb-0">
            {navLinks.map((link) => (
              <li key={link.route}>
                <Link href={link.path} className="mr-4 hover:underline md:mr-6">
                  {link.route}
                </Link>
              </li>
            ))}
          </ul>}
        </div>
        <hr className="my-6 text-muted-foreground sm:mx-auto" />
        <span className="block text-sm text-muted-foreground sm:text-center">
          © {new Date().getFullYear()}{" "}
          <a
            target="_blank"
            href="https://github.com/junyoung4949"
            className="hover:underline"
          >
            junyoung4949
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  )
}
