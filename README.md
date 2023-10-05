# Minecraft-3D-data-exporter

これは Minecraft(統合版)における指定した範囲の座標の構造物を JSON 形式の文字列でサーバに送信するものです。

JSON データを受け取ってユーザが指定したメールアドレスに 3D データを送信するサーバ側は[こちら](https://github.com/akahoshi1421/minecraft-WebSocket-server)

## 導入方法

1. プロジェクトの clone

```shell
$ # あらかじめ対象のワールドのbehavior_packsフォルダまで移動させておく
$ git clone https://github.com/akahoshi1421/minecraft-3D-data-exporter.git
```

2. プロジェクトのビルド

```shell
$ npm i
$ tsc
```

## 使い方

1. 対象のワールドに入ります
2. **/function connect**と入力します。
3. 建築をした後、ダイアモンドの剣を持ち、始点と終点の座標でそれぞれ右クリックをします。
4. 木の棒を持ち右クリックするとメニューが出てくるので、メールアドレスと確認ボタンを入力した後送信ボタンを押します。
