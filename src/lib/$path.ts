export const pagesPath = {
  signin: {
    $url: (url?: { hash?: string }) => ({
      pathname: "/signin" as const,
      hash: url?.hash,
    }),
  },
  signup: {
    $url: (url?: { hash?: string }) => ({
      pathname: "/signup" as const,
      hash: url?.hash,
    }),
  },
  $url: (url?: { hash?: string }) => ({
    pathname: "/" as const,
    hash: url?.hash,
  }),
};

export type PagesPath = typeof pagesPath;
