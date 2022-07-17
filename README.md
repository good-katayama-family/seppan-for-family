# 折半するよ

## developにマージする方法
- developから作業ブランチを作る
  - git branch ブランチ名
  - git switch ブランチ名
  
  
  上記二つのコマンドをまとめると
  - git switch -c ブランチ名
  
 - 作業ができたらdevelopに移動
 - git pull
 - 作業ブランチに移動
 - git merge develop
 - コンフリクト解消
 - commit push
 - PR
 - merge
 
 
 ##### developからmainへのマージはkatayama8000がやるよ
 
 
  
 
## 使用技術スタック
- TypeScript ---- good-programming-language
- React.js ---- javascript-library
- Next.js ---- react-library
- tailwind.css ---- css
- Prettier ---- formatter
- ESLint ---- linter
- Mantine ---- UI-library
- supabase ---- backend
