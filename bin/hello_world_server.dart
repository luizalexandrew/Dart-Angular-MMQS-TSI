
import 'dart:io';

main() async {
  	var requestServer =
    await HttpServer.bind(InternetAddress.LOOPBACK_IP_V4, 4000 );
  	print('Rodando na porta, port ${requestServer.port}');

  	await for (HttpRequest request in requestServer) {
  		
  		if (request.uri.path == '/personagens') {
  			var contents = await new File('personagens.txt').readAsString();
	  		request.response..write(contents)..close();
  		}
  		if (request.uri.path == '/naves') {
  			var contents = await new File('naves.txt').readAsString();
	  		request.response..write(contents)..close();
  		}else{
  			request.response..write("APIs disponíveis /personagens e /naves")..close();
  		}
	}
}
