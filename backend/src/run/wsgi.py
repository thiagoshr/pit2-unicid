from flask import Flask

from auth.authEndpoints import authEndpoints

def create_app():
	app = Flask(__name__)

	app.url_map.strict_slashes = False

	authEndpoints(app)
	
	return app