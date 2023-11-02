from run.wsgi import create_app

# debugging mode

if __name__ == "__main__":
	app = create_app()

	app.run(
		debug=False, # debugging pelo debugpy
		host='0.0.0.0',
		port=5000
	)
	