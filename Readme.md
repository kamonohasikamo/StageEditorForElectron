# StageEditorForElectron

Electron でステージを自動生成できるゲーム支援システムツールを作成しました。
基本的にはローグライクのようなゲームで使用できると思います。

# DEMO

アプリを起動すると下図のようなものが表示されます。

アプリの起動は、ターミナルを開いて
```bash
electron .
```
とすれば起動できます。(後述のNode.js, Electronがインストールされている前提)
![起動画面](https://github.com/kamonohasikamo/StageEditorForElectron/blob/develop/img/input_1.png)

各項目を設定し、生成ボタンを押すと出力部分にこのようなデータが表示されます。
![出力画面](https://github.com/kamonohasikamo/StageEditorForElectron/blob/develop/img/output_1.png)

データ下部にある「CSV出力」ボタンを押すと、このようなポップアップウィンドウが表示されます。
outputフォルダに作成したステージが保存されています。
![出力画面2](https://github.com/kamonohasikamo/StageEditorForElectron/blob/develop/img/output_2.png)

# Requirement
 
このシステムの情報は以下の通りです。
 
* Node.js v14.8.0
* Electron v10.0.0
 
# Installation
 
## Node.js

Node.jsのインストール方法

[Node.js HP](https://nodejs.org/ja/)

からNode.jsをダウンロードする。

ダウンロード後、ポップアップウィンドウを確認してインストールを行う。

インストールができているかどうかの確認は
```bash
node --version
```

を実行するとバージョン情報が表示される。

## Electron

Electronのインストール方法

Node.js が入っている状態でターミナルを開き
```bash
npm i electron -g
```
とすればElectronがインストールされる。

# Usage

```bash
git clone https://github.com/kamonohasikamo/StageEditorForElectron.git
```
で本ツールをクローン出来る。

本ツールをクローン後、フォルダ直下でターミナルを開き、
 
```bash
electron .
```

で起動できます。
# Note

設定項目はありますが、「まったく部屋ができない」という可能性もあるため、納得のいくステージができるまで生成ボタンを押してください。
