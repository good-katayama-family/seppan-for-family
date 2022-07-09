export const pagesPath = {
  "addform": {
    $url: (url?: { hash?: string }) => ({ pathname: '/addform' as const, hash: url?.hash })
  },
  "chart": {
    $url: (url?: { hash?: string }) => ({ pathname: '/chart' as const, hash: url?.hash })
  },
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash })
}

export type PagesPath = typeof pagesPath
