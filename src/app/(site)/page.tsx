import Image from "next/image"
import { Button } from "@/components/ui/button"
import bannerImg from "../../../public/appBanner.png"
import TitleSection from "@/components/TitleSection"

export default function HomePage() {
  return (
    <section>
      <section className="mt-10 gap-4 overflow-hidden px-4 sm:flex sm:flex-col sm:px-6 md:items-center md:justify-center">
        <TitleSection
          pill="✨ Your Workspace, Perfected"
          title="All-In-One Collaboration and Productivity Platform"
        />
        <div className="mt-6 rounded-xl bg-white bg-gradient-to-r from-primary to-brand-primaryBlue p-[2px] sm:w-[300px]">
          <Button
            variant="secondary"
            className="w-full  rounded-[10px] bg-background p-6 text-2xl"
          >
            Get Cypress Free
          </Button>
        </div>
        <div className="relative ml-[-50px] mt-[-40px] flex w-[750px] items-center  justify-center sm:ml-0 sm:w-full md:mt-[-90px]">
          <Image src={bannerImg} alt="Application Banner" />
          <div className="absolute bottom-0 left-0 right-0 top-[50%] z-10 bg-gradient-to-t dark:from-background"></div>
        </div>
      </section>
    </section>
  )
}
