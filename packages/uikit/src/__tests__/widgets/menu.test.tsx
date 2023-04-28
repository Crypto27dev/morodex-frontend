import noop from "lodash/noop";
import { vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { renderWithProvider } from "../../testHelpers";
import { Menu, menuConfig, Language } from "../../widgets/Menu";
import { footerLinks } from "../../components/Footer/config";
import { SubMenuItemsType } from "../../components/SubMenuItems/types";

/**
 * @see https://jestjs.io/docs/en/manual-mocks
 */
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

const langs: Language[] = [...Array(20)].map((_, i) => ({
  code: `en${i}`,
  language: `English${i}`,
  locale: `en${i}-locale`,
}));

it("renders correctly", () => {
  const { asFragment } = renderWithProvider(
    <BrowserRouter>
      <Menu
        isDark={false}
        toggleTheme={noop}
        langs={langs}
        setLang={noop}
        currentLang="en-US"
        cakePriceUsd={0.23158668932877668}
        links={menuConfig}
        subLinks={menuConfig[0].items as SubMenuItemsType[]}
        footerLinks={footerLinks}
        activeItem="Trade"
        activeSubItem="Exchange"
        buyCakeLabel="Buy CAKE"
        buyCakeLink="https://dapp-frontend-prince.web.app/swap?outputCurrency=0x43018838ABca94148Fb67A9F61f8b06fAb8F76C9&chainId=56"
      >
        body
      </Menu>
    </BrowserRouter>
  );

  expect(asFragment()).toMatchSnapshot();
});
