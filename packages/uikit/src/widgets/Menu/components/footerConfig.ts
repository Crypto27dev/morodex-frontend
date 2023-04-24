import { ContextApi } from "@pancakeswap/localization";
import { FooterLinkType } from "../../../components/Footer/types";

export const footerLinks: (t: ContextApi["t"]) => FooterLinkType[] = (t) => [
  {
    label: t("About"),
    items: [
      {
        label: t("Contact"),
        href: "https://docs.morodex.io/contact-us",
        isHighlighted: true,
      },
      {
        label: t("Brand"),
        href: "https://docs.morodex.io/brand",
      },
      {
        label: t("Blog"),
        href: "https://medium.com/pancakeswap",
      },
      {
        label: t("Community"),
        href: "https://docs.morodex.io/contact-us/telegram",
      },
      {
        label: t("Litepaper"),
        href: "https://v2litepaper.morodex.io/",
      },
    ],
  },
  {
    label: t("Help"),
    items: [
      {
        label: t("Customer Support"),
        href: "https://docs.morodex.io/contact-us/customer-support",
      },
      {
        label: t("Troubleshooting"),
        href: "https://docs.morodex.io/help/troubleshooting",
      },
      {
        label: t("Guides"),
        href: "https://docs.morodex.io/get-started",
      },
    ],
  },
  {
    label: t("Developers"),
    items: [
      {
        label: "Github",
        href: "https://github.com/pancakeswap",
      },
      {
        label: t("Documentation"),
        href: "https://docs.morodex.io",
      },
      {
        label: t("Bug Bounty"),
        href: "https://docs.morodex.io/code/bug-bounty",
      },
      {
        label: t("Audits"),
        href: "https://docs.morodex.io/help/faq#is-pancakeswap-safe-has-pancakeswap-been-audited",
      },
      {
        label: t("Careers"),
        href: "https://docs.morodex.io/hiring/become-a-chef",
      },
    ],
  },
];
