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

## CreateStage
起動するとこのような画面が出てきます。
![起動画面](https://github.com/kamonohasikamo/StageEditorForElectron/blob/master/img/input_1.png)

各項目を設定し、生成ボタンを押すと出力部分にこのようなデータが表示されます。
![出力画面](https://github.com/kamonohasikamo/StageEditorForElectron/blob/master/img/output_1.png)

黒が壁、黄色が空(部屋)を表しており、視覚的に見やすくなっています。

データ下部にある「CSV出力」ボタンを押すと、このようなポップアップウィンドウが表示されます。
outputフォルダに作成したステージが保存されています。
![出力画面2](https://github.com/kamonohasikamo/StageEditorForElectron/blob/master/img/output_2.png)

## EditStage
起動画面から「編集画面へ」のボタンを押すとこのような画面に切り替わります。
![編集画面トップ](https://github.com/kamonohasikamo/StageEditorForElectron/blob/master/img/input_stage_1.png)

この画面の入力部で先ほど作成したステージファイル(CSV)を選択するとこのように出力されます。
![ステージ出力](https://github.com/kamonohasikamo/StageEditorForElectron/blob/master/img/output_stage_1.png)

0が壁、1が空(部屋)を表しており、それぞれ白と赤で色分けされています。

ステージ生成画面では部屋のみの作成だったので、道を作りたい場合は好きな位置の数値を変えることで好みのステージを作成することができます。

完成したら画面中央にある「CSVファイル出力」ボタンを押すとこのようなポップアップウィンドウが表示されます。

![ステージ出力](https://github.com/kamonohasikamo/StageEditorForElectron/blob/master/img/output_stage_2.png)

このようなポップアップウィンドウが表示されれば、該当箇所に編集したCSVファイルが上書きされて保存されます。

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

※追記
runElectron.batファイルを作成しました．
Windowsの方はこれをクリックすれば起動できます．
# Note

設定項目はありますが、「まったく部屋ができない」という可能性もあるため、納得のいくステージができるまで生成ボタンを押してください。



   