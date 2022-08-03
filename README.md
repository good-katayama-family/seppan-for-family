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
 - git branch -D ブランチ名 --- ローカルブランチを削除
 - git branch -m ブランチ名 --- ローカルブランチ名を変更
 - git push --delete origin ブランチ名 --- リモートブランチを削除
 - git branch -a --- リモートブランチを確認
 - git fetch origin pull/12/head:PR-12 --- PRを確認するためにローカルに持ってくる
  
 ### 便利なショートカット
 - ［Ctrl］＋［Shift］＋［T］--- 閉じてしまったタブを元に戻す 
 
 
  
 
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
 ◎ --- 主キー　
 △ --- 外部キー 
 
 - month_of_money
 
項目名|内容|型|キー
---|---|---|---
id|primary-key|int8|◎
create_date|作成日|int8|
rent|家賃|int8|
utility|光熱費|int8|
water|水道代|int8|
food|食費|int8|
communication|通信費|int8|
daily|日用品|int8|
entertainment|交際費|int8|
others|その他|int8|
userid|ユーザーID|string|△

 - family
 
項目名|内容|型|キー
---|---|---|---
family_code|ファミリーコード|string|◎
wife|妻ユーザーID|string|△
husband|旦那ユーザーID|string|△
ratio|割合|int8|

 - userinfo
 
項目名|内容|型|キー
---|---|---|---
userid|ユーザーID|string|◎
username|ユーザー名|string|
password|パスワード|string|
family_code|ファミリーコード|string|△


 - subscription_management
 
項目名|内容|型|キー
---|---|---|---
id|ユーザーID|int8|◎
creat_at|作成日|date|
userid|ユーザーID|string|△
subname|サブスクリプション|string|
deadline|締日|date|
membership_fee|会費|int8|
pay_period|支払い周期|string|

