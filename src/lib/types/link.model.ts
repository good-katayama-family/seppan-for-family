export type linkType = {
  url:
    | "/"
    | "/addform"
    | "/line"
    | "/pop"
    | "/signin"
    | "/signup"
    | "/subscription"
    | "/subscriptionAdd"
    | "/subscriptionModify"
    | "/test"
    | "/error";
  name:
    | "家計簿"
    | "サブスク管理"
    | "サインイン"
    | "サインアップ"
    | "追加(開発中のみ)"
    | "修正(開発中のみ)"
    | "404(開発中のみ)";
  icon: JSX.Element;
};
