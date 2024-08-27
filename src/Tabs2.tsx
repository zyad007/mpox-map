/**
 * v0 by Vercel.
 * @see https://v0.dev/t/OpqjgtTQYXf
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"

import { useEffect } from "react"

export default function Tabs2({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: Function }) {

  async function changeTab(id: string) {
    setActiveTab(id)
  }
  useEffect(() => {

  })
  return (
    <div className="w-full bg-blue-500 text-white flex my-2 justify-around items-center py-2 rounded-md cursor-pointer">
      {['Map', 'Table'].map((year) => {
        return <div id={year} className={ 'select-none w-64 flex justify-center items-center '+(activeTab == year ? "selected-tab" : "tab")} onClick={(e) => {
          const element = e.target as Element
          changeTab(element.id)
        }}>{year}</div>
      })}
    </div>
  )
}