export const pagesPath = {
  "addform": {
    $url: (url?: { hash?: string }) => ({ pathname: '/addform' as const, hash: url?.hash })
  },
  "line": {
    $url: (url?: { hash?: string }) => ({ pathname: '/line' as const, hash: url?.hash })
  },
  "pop": {
    $url: (url?: { hash?: string }) => ({ pathname: '/pop' as const, hash: url?.hash })
  },
  "signin": {
    $url: (url?: { hash?: string }) => ({ pathname: '/signin' as const, hash: url?.hash })
  },
  "signup": {
    $url: (url?: { hash?: string }) => ({ pathname: '/signup' as const, hash: url?.hash })
  },
  "subscription": {
    $url: (url?: { hash?: string }) => ({ pathname: '/subscription' as const, hash: url?.hash })
  },
  "subscriptionAdd": {
    $url: (url?: { hash?: string }) => ({ pathname: '/subscriptionAdd' as const, hash: url?.hash })
  },
  "test": {
    $url: (url?: { hash?: string }) => ({ pathname: '/test' as const, hash: url?.hash })
  },
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash })
}

export type PagesPath = typeof pagesPath
