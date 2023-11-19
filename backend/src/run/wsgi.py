import os
from flask import Flask
from werkzeug.utils import secure_filename

from auth.authEndpoints import authEndpoints

def create_app():
	UPLOAD_FOLDER = '/opt/cafeteria/images'
	ALLOWED_EXTENSIONS = {'jpeg', 'jpg', 'gif', 'png'}

	app = Flask(__name__)
	app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
	app.config['MAX_CONTENT_LENGTH'] = 2 * 1024 * 1024 # 2 MiB file size limit

	app.url_map.strict_slashes = False

	authEndpoints(app)
	
	return app