from livereload import Server


server = Server()
server.watch('./*')
server.serve(root='./')
