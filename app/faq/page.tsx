import type { Metadata } from "next"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { PageHero } from "@/components/page-hero"
import { Reveal } from "@/components/reveal"
import { Section } from "@/components/section"
import { contactEmail, docsUrl } from "@/lib/site"

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about the Xorgate platform.",
}

const faqs: { question: string; answer: string }[] = [
  {
    question: "What hardware do I need to get started?",
    answer:
      "A Raspberry Pi 5 (or Compute Module 5) with a camera is enough today. The install script sets up everything else. Daedalus dev kits, which bundle the board, cameras, cellular modem, and enclosure, are in development.",
  },
  {
    question: "Does it work without a network connection?",
    answer:
      "Yes, by design. Devices record video and telemetry to local storage through dead zones; losing cellular only pauses the upload. When coverage returns, the backlog uploads oldest-first and nothing is lost.",
  },
  {
    question: "How does provisioning work?",
    answer:
      "You mint a claim code in the console, then run one command on the device. The script claims the code, receives the device's certificate, installs the agent, and the device appears in your fleet streaming telemetry. Nothing is typed into the device by hand.",
  },
  {
    question: "What sensors and data are supported?",
    answer:
      "Out of the box: motion (IMU), GPS/GNSS, cellular signal, and system health, published once per second, plus live video from CSI cameras over WebRTC. Devices without a given sensor simply omit those metrics rather than reporting zeros.",
  },
  {
    question: "Can I get my data out?",
    answer:
      "Yes. Telemetry is queryable over the REST API (latest values, time ranges, raw readings), and recordings are served with signed URLs you can download. Your data is yours.",
  },
  {
    question: "Is there an SDK?",
    answer:
      "The REST API ships today with an interactive OpenAPI reference in the docs. JavaScript and React SDKs are in development and follow the same shapes as the API.",
  },
  {
    question: "How is the fleet secured?",
    answer:
      "Every device gets its own X.509 certificate at provisioning and talks over mutual-TLS MQTT; there are no shared credentials on devices. Access in the cloud is scoped by organization, workspace, and role.",
  },
  {
    question: "Where does Xorgate run?",
    answer:
      "The platform runs on AWS (us-east-1 today). Live video streams peer-to-peer from the device to your browser over WebRTC, so footage takes the shortest path.",
  },
]

export default function FaqPage() {
  return (
    <>
      <PageHero
        accent="dots-tr"
        eyebrow="FAQ"
        title="Frequently asked questions"
        intro="The short answers. The documentation has the long ones."
      />
      <Reveal>
        <Section className="pt-0 md:pt-0" accent="hatch-bl">
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
          <div className="mt-10 flex flex-wrap gap-3">
            <Button variant="outline" size="lg" asChild>
              <a href={docsUrl}>Read the docs</a>
            </Button>
            <Button variant="ghost" size="lg" asChild>
              <a href={`mailto:${contactEmail}`}>
                Still curious? Email us
                <ArrowRight data-icon="inline-end" />
              </a>
            </Button>
          </div>
        </Section>
      </Reveal>
    </>
  )
}
