import json

def helloEndpoint(app):
	@app.route('/hello')
	def apiHello():
		return json.dumps({'message': 'Hello, world!'}), 200
	