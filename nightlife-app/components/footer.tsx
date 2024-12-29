'use client'

import { ChevronRight } from 'lucide-react'
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
          <AccordionItem key={section.title} value={section.title} className="border-none">
            <AccordionTrigger className="py-4 text-base font-medium hover:no-underline">
              {section.title}
              <ChevronRight className="h-4 w-4 shrink-0 text-zinc-500 transition-transform duration-200" />
            </AccordionTrigger>
            <AccordionContent>
              <div className="pb-4 space-y-3">
                {section.items.map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="block text-sm text-zinc-400 hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <div className="py-6 text-center text-sm text-zinc-500">
        Copyright @ Chiongster.com 2024
      </div>
    </footer>
  )
}

