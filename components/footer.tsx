'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const footerSections = [
  {
    title: 'FOR CHIONGSTER',
    items: ['About Us', 'Contact Us', 'Terms & Conditions', 'Privacy Policy']
  },
  {
    title: 'DISCOVER',
    items: ['Nightlife Guide', 'Events', 'Blog', 'Featured Places']
  },
  {
    title: 'FOR BUSINESSES',
    items: ['List Your Venue', 'Advertising', 'Business Support', 'Partnership']
  },
  {
    title: 'COUNTRIES',
    items: ['Singapore', 'Malaysia', 'Thailand', 'Vietnam']
  }
]

export function Footer() {
  return (
    <footer className="mt-12 border-t border-zinc-800">
      <Accordion type="single" collapsible className="divide-y divide-zinc-800">
        {footerSections.map((section) => (
          <AccordionItem key={section.title} value={section.title} className="border-solid">
            <AccordionTrigger className="py-4 text-base font-medium hover:no-underline flex justify-between items-center px-4">
              <div className="flex items-center gap-2">
                {section.title}
              </div>          
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 px-4 pb-4">
                {section.items.map((item) => (
                  <button
                    key={item}
                    className="block w-full text-left py-2 text-sm text-zinc-400 hover:text-white"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <div className="py-6 text-center text-sm text-zinc-500">
        Copyright @ Chiongster.com 2025
      </div>
    </footer>
  )
}

