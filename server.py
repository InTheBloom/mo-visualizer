# pythonでlivereloadをするための簡易プログラム
# pyenvを作ってpipでlivereloadをinstallしたら多分動く。
# カレントをプロジェクトルートにして起動したらオートリロードできる。

from livereload import Server

server = Server()
server.watch("./*")
server.serve(root="./", open_url=False);
