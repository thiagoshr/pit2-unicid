import psycopg2
import psycopg2.extras
import psycopg2.extensions

def dbQuery(query : str, params : tuple):
	conn = psycopg2.connect(
		host='database',
		user='admin',
		password='teste123',
		dbname='cafeteria'
	)
	
	cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
	
	cur.execute(query, params)

	result = cur.fetchall()

	conn.commit()
	conn.close()

	return result

def failResult(msg: str, http_code: int):
	return {'success' : False, 'error': msg}, http_code

def successResult(data: list):
	return {'success': True, 'data': data}, 200 # http 200 ok
