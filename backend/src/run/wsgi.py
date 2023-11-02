from flask import Flask

from hello.helloEndpoint import helloEndpoint

def create_app():
	app = Flask(__name__)

	app.url_map.strict_slashes = False

	helloEndpoint(app)
	
	return app