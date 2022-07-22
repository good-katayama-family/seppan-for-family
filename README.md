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
  - add commit push
  - PR --- プルリクエストの略
  - merge --- ブランチを結合
 
 ##### developからmainへのマージはkatayama8000がやるよ
 
 ### その他よく使うgitコマンド
  - git branch -D ブランチ名 --- ブランチを削除
  - git branch -m ブランチ名 --- ブランチ名を変更
 
 
  
 
## 使用技術スタック
- TypeScript ---- good-programming-language
- React.js ---- javascript-library
- Next.js ---- react-library
- tailwind.css ---- css-library
- Prettier ---- formatter
- ESLint ---- linter
- Mantine ---- UI-library
- supabase ---- backend

## テーブル
 - month_of_money
 
項目名|内容|型|キー
---|---|---|---
id|primary-key|int8|〇
create_date|作成日|int8|
rent|家賃|int8|
utility|光熱費|int8|
water|水道代|int8|
food|食費|int8|
communication|通信費|int8|
daily|日用品|int8|
entertainment|交際費|int8|
others|その他|int8|
userid|ユーザーID|string|

 - family
 
項目名|内容|型|キー
---|---|---|---
family_code|family_code|int8|〇
wife|妻ID|string|
husband|旦那ID|string|
ratio|割合|int8|
