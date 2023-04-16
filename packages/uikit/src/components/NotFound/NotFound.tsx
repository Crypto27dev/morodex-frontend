import styled from "styled-components";
import { NextSeo } from "next-seo";
import { Button, Heading, Text, LogoIcon } from "@pancakeswap/uikit";
import { useTranslation } from "@pancakeswap/localization";
import Link from "next/link";

const StyledNotFound = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 64px);
  justify-content: center;
`;

const NotFound = ({ statusCode = 404 }: { statusCode?: number }) => {
  const { t } = useTranslation();

  return (
    <>
      <NextSeo title="404" />
      <StyledNotFound>
        <LogoIcon width="64px" mb="8px" />
        <Heading scale="xxl">{statusCode}</Heading>
        <Text mb="16px">{t("Oops, page not found.")}</Text>
        <Link href="/" passHref>
          <Button as="a" scale="sm">
            {t("Back Home")}
          </Button>
        </Link>
      </StyledNotFound>
    </>
  );
};

export default NotFound;
