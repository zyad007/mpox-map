/**
 * v0 by Vercel.
 * @see https://v0.dev/t/OpqjgtTQYXf
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"

import { useEffect } from "react"

export default function Tabs({ activeTab, setActiveTab, years }: { activeTab: string, setActiveTab: Function, years: string[] }) {
  async function changeTab(id: string) {
    setActiveTab(id)
  }
  useEffect(() => {

  })
  return (
    <div className="w-full bg-[#dedede] flex my-2 justify-around items-center py-2 rounded-md cursor-pointer">
      {years.map((year) => {
        return <div id={year} className={activeTab == year?"selected-tab":"tab"} onClick={(e) => {
          const element = e.target as Element
          changeTab(element.id)
        }}>{year}</div>
      })}
      <div id="0" className={activeTab == "0"?"selected-tab":"tab"} onClick={(e) => {
        const element = e.target as Element
        changeTab(element.id)
      }}>Total</div>
    </div>
  )
}