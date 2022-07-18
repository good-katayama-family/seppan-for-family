マークダウンの記法

https://www.wakuwakubank.com/posts/861-git-markdown/

## developにマージする方法
- developから作業ブランチを作る
  - git branch ブランチ名 --- branchを作成する
  - git switch ブランチ名 --- branchを切り替える
  
  
  上記二つのコマンドをまとめると
  - git switch -c ブランチ名　--- branchを新規作成して、切り替え
  
- 作業ができたらdevelopに移動しマージができる状態にブランチを更新する
  - git switch develop --- developブランチに移動
  - git pull --- リモートブランチをローカルに取り込む
  - git switch ブランチ名 --- 作業ブランチに移動
  - git merge develop --- developを取り込む　
  - コンフリクト解消
  - commit push
  - PR --- プルリクエストの略
  - merge --- ブランチを結合
 
 
 ##### developからmainへのマージはkatayama8000がやるよ
 
 
  
 
## 使用技術スタック
- TypeScript ---- good-programming-language
- React.js ---- javascript-library
- Next.js ---- react-library
- tailwind.css ---- css-library
- Prettier ---- formatter
- ESLint ---- linter
- Mantine ---- UI-library
- supabase ---- backend
