import bcrypt
import hashlib
from datetime import datetime as datetime
from flask import request
from utilities import dbQuery, failResult, successResult

def validateSession(chave_sessao: str):
	"""
	output: id_usuario
	"""

	sql = """
		SELECT id_usuario, (expires_at > CURRENT_TIMESTAMP) as "valid"
		FROM sessao
		WHERE chave = %s;
"""
	dbResult = dbQuery(sql, (chave_sessao,))
	
	if len(dbResult) < 1 or not dbResult[0]['valid']:
		raise PermissionError('Unauthenticated')
	return dbResult['id_usuario']

def authEndpoints(app):
	@app.route('/auth/login', methods=['POST'])
	def login():
		"""
			autentica usuario

			inputs:
				usuario
				senha
			outputs:
				chave_sessao
				tipo
		"""

		sql = """
			SELECT id, senha AS "hash_senha", tipo
			FROM usuario
			WHERE username = %s;
		"""

		dbResult = dbQuery(sql, (request.form['usuario'],))
		if len(dbResult) < 1:
			return failResult('Unauthenticated', 403)
		
		userData = dbResult[0]
		
		if bcrypt.checkpw(str(request.form['senha']).encode('utf-8'), str(userData['hash_senha']).encode('utf-8')):
			builder = hashlib.sha256()
			builder.update(datetime.now().isoformat().encode('utf-8'))
			builder.update(str(userData['id']).encode('utf-8'))
			chave = builder.hexdigest()

			sql = """
				INSERT
				INTO sessao (chave, id_usuario)
				VALUES (%s, %s)
				RETURNING chave;
			"""
			dbResult = dbQuery(sql, (chave, int(userData['id'])))

			return successResult([{
				'chave_sessao': chave,
				'tipo': int(userData['tipo'])
			}])
		
	@app.route('/auth/logout', methods=['POST'])
	def logout():
		"""
			encerra sessão

			inputs:
				chave_sessao
			outputs:
				success
		"""

		sql = """
			UPDATE sessao
			SET expires_at = CURRENT_TIMESTAMP
			WHERE chave = %s
			RETURNING chave;
		"""

		dbResult = dbQuery(sql, (request.form['chave_sessao'],))
		if len(dbResult) < 1:
			return failResult('Invalid session', 400)
		return successResult([])
	
