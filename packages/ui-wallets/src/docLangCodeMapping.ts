const docLangCodeMapping: Record<string, string> = {
  it: 'italian',
  ja: 'japanese',
  fr: 'french',
  tr: 'turkish',
  vi: 'vietnamese',
  id: 'indonesian',
  'zh-cn': 'chinese',
  'pt-br': 'portuguese-brazilian',
}

export const getDocLink = (code: string) =>
  docLangCodeMapping[code]
    ? `https://docs.dapp-frontend-prince.web.app/v/${docLangCodeMapping[code]}/get-started/connection-guide`
    : `https://docs.dapp-frontend-prince.web.app/get-started/connection-guide`
