import 'dart:io';

main() async {
  	var requestServer =
    await HttpServer.bind(InternetAddress.LOOPBACK_IP_V4, 4000 );
  	print('Aplicação radando na porta: ${requestServer.port}');

  	await for (HttpRequest request in requestServer) {

        request.response.headers.add("Access-Control-Allow-Origin", "*");
        request.response.headers.add("Access-Control-Allow-Methods", "POST,GET,DELETE,PUT,OPTIONS");

        request.response.statusCode = HttpStatus.OK;

        switch (request.uri.path) {
            case '/personagens':
                var contents = await new File('personagens.txt').readAsString();
                request.response..write(contents)..close();
                break;
            case '/naves':
                var contents = await new File('naves.txt').readAsString();
                request.response..write(contents)..close();
                break;
            default:
                request.response..write("APIs disponíveis /personagens e /naves.")..close();
        }

	}
}
