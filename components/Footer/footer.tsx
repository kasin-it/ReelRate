import Link from "next/link"
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"

import Container from "@/components/ui/container"
import Logo from "@/components/ui/logo"
import FooterSection from "@/components/Footer/footer-section"

function Footer() {
    const FOOTER_NAVIGATION = [
        {
            section: "Company",
            links: [
                { label: "Latest Reviews", href: "#" },
                { label: "About Our Reviews", href: "#" },
                { label: "Get in Touch", href: "#" },
                { label: "Our Movie Recommendations", href: "#" },
                { label: "FAQs about Movies", href: "#" },
            ],
        },
        {
            section: "About",
            links: [
                { label: "Movie Insights", href: "#" },
                { label: "Who We Are", href: "#" },
                { label: "Connect with Us", href: "#" },
                { label: "Our Movie Selection", href: "#" },
                { label: "Answers to FAQs", href: "#" },
            ],
        },
        {
            section: "Contact",
            links: [
                { label: "Share Your Thoughts", href: "#" },
                { label: "About Us", href: "#" },
                { label: "Reach Out", href: "#" },
                { label: "Movie Services", href: "#" },
                { label: "FAQs about Contact", href: "#" },
            ],
        },
    ]

    const SOCIAL_PROVIDERS = [
        {
            provider: "facebook",
            href: "#",
            src: <Facebook />,
        },
        {
            provider: "twitter",
            href: "#",
            src: <Twitter />,
        },
        {
            provider: "linkedin",
            href: "#",
            src: <Linkedin />,
        },
    ]

    const year = new Date().getFullYear()

    return (
        <Container>
            <footer className="flex w-full flex-wrap justify-between gap-10 px-4 py-24">
                <div className="flex w-full flex-col items-start pb-6 md:w-auto">
                    <div className="flex w-full flex-col items-start justify-between space-y-4 sm:flex-row md:flex-col">
                        <div>
                            <Logo />
                            <p className="text-sm">©{year}</p>
                        </div>
                        <div className="flex gap-2">
                            {SOCIAL_PROVIDERS.map((provider) => (
                                <Link
                                    href={"#"}
                                    aria-label={provider.provider}
                                    key={provider.provider}
                                >
                                    {provider.src}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {FOOTER_NAVIGATION.map((section) => (
                    <FooterSection
                        key={section.section}
                        section={section.section}
                        links={section.links}
                    />
                ))}
            </footer>
        </Container>
    )
}

export default Footer
