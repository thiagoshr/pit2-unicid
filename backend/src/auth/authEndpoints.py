import bcrypt
import hashlib
from datetime import datetime as datetime
from flask import request
from utilities import dbQuery, failResult, successResult

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
