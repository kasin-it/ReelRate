import Link from "next/link"

interface FooterSectionInterface {
    section: string
    links: { label: string; href: string }[]
}

const FooterSection = ({ section, links }: FooterSectionInterface) => (
    <div className="flex flex-col space-y-3">
        <h1 className="text-xl font-bold text-muted-foreground">{section}</h1>
        <ul className="flex flex-col space-y-2 font-semibold">
            {links.map((link) => (
                <li key={link.label}>
                    <Link
                        className="transition duration-200 hover:opacity-60"
                        href={link.href}
                    >
                        {link.label}
                    </Link>
                </li>
            ))}
        </ul>
    </div>
)

export default FooterSection
