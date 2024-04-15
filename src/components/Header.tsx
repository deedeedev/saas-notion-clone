"use client"

import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"

import logoImg from "../../public/cypresslogo.svg"
import diamondImg from "../../public/icons/diamond.svg"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import React, { useState } from "react"
import { Button } from "./ui/button"
import ModeToggle from "./ModeToggle"

const items: { title: string; href: string; description: string }[] = [
  {
    title: "One",
    href: "#",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Asperiores, recusandae.",
  },
  {
    title: "Two",
    href: "#",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque aliquam voluptatum adipisci dignissimos accusantium necessitatibus.",
  },
  {
    title: "Three",
    href: "#",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores, veritatis tenetur! Doloribus.",
  },
  {
    title: "Four",
    href: "#",
    description: "Lorem ipsum dolor sit amet.",
  },
  {
    title: "Five",
    href: "#",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Necessitatibus, ad.",
  },
  {
    title: "Six",
    href: "#",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Est porro minus cum.",
  },
]

export default function Header() {
  const [path, setPath] = useState<string>("#products")
  return (
    <header className="flex items-center justify-between p-4">
      <Link href="/" className="justify-left flex w-full items-center">
        <Image src={logoImg} alt="Cypress Logo" width={25} height={25} />
        <span className="font-semibold dark:text-white">cypress.</span>
      </Link>
      <NavigationMenu className="hidden md:block">
        <NavigationMenuList className=" gap-6">
          <NavigationMenuItem>
            <NavigationMenuTrigger
              onClick={() => setPath("#resources")}
              className={cn({
                "dark:text-white": path === "#resources",
                "dark:text-white/40": path !== "#resources",
                "font-normal": true,
                "text-xl": true,
              })}
            >
              Resources
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="flex h-full w-full select-none flex-col items-center justify-center rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href="/"
                    >
                      AAA
                    </a>
                  </NavigationMenuLink>
                </li>
                <ListItem href="#" title="Introduction">
                  Re-usable components built using Radix UI and Tailwind CSS.
                </ListItem>
                <ListItem href="#" title="Installation">
                  How to install dependencies and structure your app.
                </ListItem>
                <ListItem href="#" title="Typography">
                  Styles for headings, paragraphs, lists...etc
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger
              onClick={() => setPath("#pricing")}
              className={cn({
                "dark:text-white": path === "#pricing",
                "dark:text-white/40": path !== "#pricing",
                "font-normal": true,
                "text-xl": true,
              })}
            >
              Pricing
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="md:grid-row-2 grid w-[400px] gap-3  p-4  ">
                <ListItem
                  key={"ProPlan"}
                  title="Pro Plan"
                  // title={
                  //   <div className="flex items-center gap-2">
                  //     <Image src={diamondImg} alt="Pro Plan Diamond Icon" />
                  //     <span>Pro Plan</span>
                  //   </div>,
                  // }
                  href="#"
                >
                  Unlock full power with collaboration.
                </ListItem>
                <ListItem key="ProPlan" title="free Plan" href="#">
                  Great for teams just starting out.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger
              onClick={() => setPath("#products")}
              className={cn({
                "dark:text-white": path === "#products",
                "dark:text-white/40": path !== "#products",
                "font-normal": true,
                "text-xl": true,
              })}
            >
              Products
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {items.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="#" legacyBehavior passHref>
              <NavigationMenuLink
                onClick={() => setPath("#testimonials")}
                className={cn(navigationMenuTriggerStyle(), {
                  "dark:text-white": path === "#testimonials",
                  "dark:text-white/40": path !== "#testimonials",
                  "font-normal": true,
                  "text-xl": true,
                })}
              >
                Testimonials
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <aside className="flex w-full justify-end gap-2">
        <Link href="/login">
          <Button variant="secondary" className="hidden p-1 sm:block">
            Login
          </Button>
        </Link>

        <Link href="/signup">
          <Button variant="default" className="whitespace-nowrap ">
            Sign Up
          </Button>
        </Link>
        <ModeToggle></ModeToggle>
      </aside>
    </header>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "group block select-none space-y-1 rounded-md p-3 leading-none text-card-foreground/60 no-underline outline-none transition-colors  hover:bg-accent/30 focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none text-white">
            {title}
          </div>
          <p className=" line-clamp-2  text-sm leading-snug text-white/40 group-hover:text-white/70">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
