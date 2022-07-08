export const pagesPath = {
  "chart": {
    $url: (url?: { hash?: string }) => ({ pathname: '/chart' as const, hash: url?.hash })
  },
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash })
}

export type PagesPath = typeof pagesPath
