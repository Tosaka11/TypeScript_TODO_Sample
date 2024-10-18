# TypeScript_TODO_Sample
   リポジトリをクローンする
   ターミナルを開いて、クローンしたいリポジトリのURLを使って以下のコマンドを実行。
   ```bash
   git clone <リポジトリのURL>
   ```

### 1. フロントエンド（React + TypeScript）の設定
### 2. バックエンド（Node.js + TypeScript）の設定
1. **必要なパッケージのインストール**
   frontendフォルダとbackendフォルダで以下のコマンドを実行。
   ```bash
   npm install
   ```


#### 1.3 PostgreSQLのセットアップ
1. **PostgreSQLのインストール**  
   ローカルでPostgreSQLをインストールし、データベースを作成します。

2. **データベースの作成**  
   pgAdminで、データベースを作成します。
   
   参考：[【PostgreSQL】 「pgAdmin 4」データベースとテーブルの操作](https://www.kemmy-it.com/2024/08/15/pgadmin_1/)

3. **テーブルの作成**  
   `todos`テーブルを作成するSQLスクリプトを実行します。
   ```sql
   CREATE TABLE todos (
     id SERIAL PRIMARY KEY,
     title VARCHAR(255) NOT NULL,
     completed BOOLEAN DEFAULT FALSE
   );
   ```

4. **ダミーデータの挿入**  
   以下のSQL文を実行
   ```sql
   INSERT INTO todos (title, completed) VALUES
   ('Buy groceries', false),
   ('Clean the house', false),
   ('Finish the project', true),
   ('Read a book', false),
   ('Go for a run', false),
   ('Prepare dinner', true),
   ('Write a blog post', false),
   ('Plan weekend trip', true),
   ('Call mom', false),
   ('Attend team meeting', true);
   ```

### 1. フロントエンドの起動
   ```bash
   npm run dev
   ```


### 2. バックエンドの起動
   ```bash
   npx tsc
   node dist/app.js
   ```