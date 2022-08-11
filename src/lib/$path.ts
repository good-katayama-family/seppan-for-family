export const pagesPath = {
  "$404": {
    $url: (url?: { hash?: string }) => ({ pathname: '/404' as const, hash: url?.hash })
  },
  "forgot": {
    $url: (url?: { hash?: string }) => ({ pathname: '/forgot' as const, hash: url?.hash })
  },
  "line": {
    $url: (url?: { hash?: string }) => ({ pathname: '/line' as const, hash: url?.hash })
  },
  "pop": {
    $url: (url?: { hash?: string }) => ({ pathname: '/pop' as const, hash: url?.hash })
  },
  "reset": {
    $url: (url?: { hash?: string }) => ({ pathname: '/reset' as const, hash: url?.hash })
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
  "subscriptionModify": {
    $url: (url?: { hash?: string }) => ({ pathname: '/subscriptionModify' as const, hash: url?.hash })
  },
  "test": {
    $url: (url?: { hash?: string }) => ({ pathname: '/test' as const, hash: url?.hash })
  },
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash })
}

export type PagesPath = typeof pagesPath
