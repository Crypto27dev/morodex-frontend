import { ContextApi } from "@pancakeswap/localization";
import { FooterLinkType } from "../../../components/Footer/types";

export const footerLinks: (t: ContextApi["t"]) => FooterLinkType[] = (t) => [
  {
    label: t("About"),
    items: [
      {
        label: t("Contact"),
        href: "https://docs.dapp-frontend-prince.web.app/contact-us",
        isHighlighted: true,
      },
      {
        label: t("Brand"),
        href: "https://docs.dapp-frontend-prince.web.app/brand",
      },
      {
        label: t("Blog"),
        href: "https://medium.com/pancakeswap",
      },
      {
        label: t("Community"),
        href: "https://docs.dapp-frontend-prince.web.app/contact-us/telegram",
      },
      {
        label: t("Litepaper"),
        href: "https://v2litepaper.dapp-frontend-prince.web.app/",
      },
    ],
  },
  {
    label: t("Help"),
    items: [
      {
        label: t("Customer Support"),
        href: "https://docs.dapp-frontend-prince.web.app/contact-us/customer-support",
      },
      {
        label: t("Troubleshooting"),
        href: "https://docs.dapp-frontend-prince.web.app/help/troubleshooting",
      },
      {
        label: t("Guides"),
        href: "https://docs.dapp-frontend-prince.web.app/get-started",
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
        href: "https://docs.dapp-frontend-prince.web.app",
      },
      {
        label: t("Bug Bounty"),
        href: "https://docs.dapp-frontend-prince.web.app/code/bug-bounty",
      },
      {
        label: t("Audits"),
        href: "https://docs.dapp-frontend-prince.web.app/help/faq#is-pancakeswap-safe-has-pancakeswap-been-audited",
      },
      {
        label: t("Careers"),
        href: "https://docs.dapp-frontend-prince.web.app/hiring/become-a-chef",
      },
    ],
  },
];
