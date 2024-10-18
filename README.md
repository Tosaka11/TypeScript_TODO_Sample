# TypeScript_TODO_Sample
   リポジトリをクローンする  
   ターミナルを開いて、クローンしたいリポジトリのURLを使って以下のコマンドを実行。
   ```bash
   git clone https://github.com/Tosaka11/TypeScript_TODO_Sample
   ```

### 1. フロントエンドとバックエンドの設定
1. **必要なパッケージのインストール**
   frontendフォルダとbackendフォルダに移動して以下のコマンドを実行。
   ```bash
   npm install
   ```


### 2. PostgreSQLのセットアップ
1. **PostgreSQLのインストール・データベースの作成**  
   pgAdminでデータベースを作成。  
   参考：[【PostgreSQL】 「pgAdmin 4」データベースとテーブルの操作](https://www.kemmy-it.com/2024/08/15/pgadmin_1/)

2. **テーブルの作成**  
   `todos`テーブルを作成するSQLスクリプトを実行します。
   ```sql
   CREATE TABLE todos (
     id SERIAL PRIMARY KEY,
     title VARCHAR(255) NOT NULL,
     completed BOOLEAN DEFAULT FALSE
   );
   ```

3. **ダミーデータの挿入**  
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

### 3. DB情報の反映
   backend/src/app.tsの以下の箇所を設定したDB情報に変更
   ```ts
   // ポスグレの情報をここに記載
   const pool = new Pool({
     user: "postgres", //user
     host: "localhost",
     database: "postgres", //db名
     password: "postgres", //password
     port: 5432,
   });
   ```

### 4. アプリの起動
1. **フロントエンドの起動** 
   frontendフォルダに移動して以下を実行
   ```bash
   npm run dev
   ```

2. **バックエンドの起動**  
   backendフォルダに移動して以下を実行
   ```bash
   npx tsc
   node dist/app.js
   ```
