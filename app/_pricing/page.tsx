import type { Metadata } from "next"
import { ArrowRight, Check } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { PageHero } from "@/components/page-hero"
import { Reveal } from "@/components/reveal"
import { Section, SectionHeading } from "@/components/section"
import { cn } from "@/lib/utils"
import { consoleUrl, contactEmail } from "@/lib/site"

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple plans for every fleet size, from first prototype to production.",
}

type Tier = {
  name: string
  price: string
  cadence?: string
  blurb: string
  highlights: string[]
  cta: { label: string; href: string }
  featured?: boolean
}

const tiers: Tier[] = [
  {
    name: "Developer",
    price: "$0",
    blurb: "For your first device on the bench.",
    highlights: [
      "1 device, 2 seats",
      "Live video and telemetry",
      "7-day telemetry retention",
      "5 GB recording storage",
      "100 workflow runs / month",
    ],
    cta: { label: "Get started", href: `${consoleUrl}/signup` },
  },
  {
    name: "Pro",
    price: "$49",
    cadence: "/month",
    blurb: "For a small fleet doing real work.",
    highlights: [
      "5 devices included, then $10 per device",
      "5 seats, 3 workspaces",
      "90-day telemetry retention",
      "100 GB recording storage",
      "1,000 workflow runs incl. video + model nodes",
      "Bring your own AI provider keys",
    ],
    cta: { label: "Start with Pro", href: `${consoleUrl}/signup` },
    featured: true,
  },
  {
    name: "Team",
    price: "$199",
    cadence: "/month",
    blurb: "For teams running fleets in production.",
    highlights: [
      "15 devices included, then $8 per device",
      "Unlimited seats, viewers free",
      "1-year telemetry retention",
      "500 GB recording storage",
      "10,000 workflow runs / month",
      "Priority support",
    ],
    cta: { label: "Start with Team", href: `${consoleUrl}/signup` },
  },
  {
    name: "Enterprise",
    price: "Custom",
    blurb: "For custom hardware and custom terms.",
    highlights: [
      "Custom fleet size and retention",
      "Bespoke carrier boards and sensors",
      "SSO and custom roles",
      "SLA and deployment support",
    ],
    cta: {
      label: "Contact us",
      href: `mailto:${contactEmail}?subject=Xorgate%20Enterprise`,
    },
  },
]

const comparison: { label: string; values: string[] }[] = [
  {
    label: "Devices",
    values: [
      "1",
      "5 incl., $10/device after",
      "15 incl., $8/device after",
      "Custom",
    ],
  },
  {
    label: "Seats",
    values: ["2", "5", "Unlimited, viewers free", "Custom + SSO"],
  },
  { label: "Workspaces", values: ["1", "3", "Unlimited", "Custom"] },
  { label: "Live video + telemetry", values: ["Yes", "Yes", "Yes", "Yes"] },
  {
    label: "Telemetry retention",
    values: ["7 days", "90 days", "1 year", "Custom"],
  },
  {
    label: "Recording storage",
    values: ["5 GB", "100 GB, then metered", "500 GB, then metered", "Custom"],
  },
  {
    label: "Workflow runs",
    values: [
      "100/mo, standard nodes",
      "1,000/mo incl. video + model nodes",
      "10,000/mo",
      "Custom",
    ],
  },
  {
    label: "Simulations",
    values: ["10/mo", "Included", "Included", "Included"],
  },
  {
    label: "AI provider keys",
    values: [
      "Bring your own",
      "BYO or platform-metered",
      "BYO or platform-metered",
      "Either",
    ],
  },
  {
    label: "Support",
    values: ["Community", "Email", "Priority", "SLA + deployment"],
  },
  {
    label: "Hardware",
    values: ["Your own Pi", "Dev kits", "Dev kits", "Custom boards"],
  },
]

const faqs: { question: string; answer: string }[] = [
  {
    question: "What counts as a device?",
    answer:
      "A claimed device in your fleet, whether or not it is currently online. Delete a device and it stops counting.",
  },
  {
    question: "What happens when I hit my storage quota?",
    answer:
      "Recordings expire oldest-first, so the newest footage is always there. Paid plans can also meter additional storage instead of expiring early.",
  },
  {
    question: "Can I bring my own AI keys?",
    answer:
      "Yes. Workflows that call external providers (Claude for vision-language nodes, Google or HERE for road data) can run on your own org-scoped credentials on any plan, stored write-only and validated when you add them.",
  },
]

export default function PricingPage() {
  return (
    <>
      <PageHero
        accent="dots-tr"
        eyebrow="Pricing"
        title="Simple plans for every fleet size"
        intro="From a single prototype on your desk to a production fleet in the field. Early access pricing: numbers may change before general availability."
      />

      <Reveal>
        <Section className="pt-0 md:pt-0">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={cn(
                  "flex flex-col rounded-xl border bg-card p-6",
                  tier.featured && "border-brand-strong"
                )}
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-medium">{tier.name}</h2>
                  {tier.featured ? (
                    <Badge variant="secondary">Popular</Badge>
                  ) : null}
                </div>
                <p className="mt-4 text-3xl font-medium tracking-tight">
                  {tier.price}
                  {tier.cadence ? (
                    <span className="text-sm font-normal text-muted-foreground">
                      {tier.cadence}
                    </span>
                  ) : null}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {tier.blurb}
                </p>
                <ul className="mt-6 flex flex-col gap-2">
                  {tier.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-2 text-sm">
                      <Check
                        className="mt-0.5 size-4 shrink-0 text-brand-strong"
                        strokeWidth={2}
                      />
                      {highlight}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-6">
                  <Button
                    variant={tier.featured ? "brand" : "outline"}
                    size="lg"
                    className="w-full"
                    asChild
                  >
                    <a href={tier.cta.href}>{tier.cta.label}</a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </Reveal>

      <Reveal>
        <Section className="border-t" accent="hatch-bl">
          <SectionHeading eyebrow="Details" title="Compare plans" />
          <div className="overflow-x-auto rounded-xl border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-44" />
                  {tiers.map((tier) => (
                    <TableHead key={tier.name}>{tier.name}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {comparison.map((row) => (
                  <TableRow key={row.label}>
                    <TableCell className="font-medium text-muted-foreground">
                      {row.label}
                    </TableCell>
                    {row.values.map((value, index) => (
                      <TableCell key={index} className="whitespace-normal">
                        {value}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Section>
      </Reveal>

      <Reveal>
        <Section className="border-t" accent="dots-tr">
          <SectionHeading eyebrow="Questions" title="Pricing FAQ" />
          <Accordion type="single" collapsible className="max-w-2xl">
            {faqs.map((faq) => (
              <AccordionItem key={faq.question} value={faq.question}>
                <AccordionTrigger className="text-left text-base">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="mt-10">
            <Button variant="ghost" size="lg" asChild>
              <a href={`mailto:${contactEmail}?subject=Pricing%20question`}>
                Ask us anything
                <ArrowRight data-icon="inline-end" />
              </a>
            </Button>
          </div>
        </Section>
      </Reveal>
    </>
  )
}
