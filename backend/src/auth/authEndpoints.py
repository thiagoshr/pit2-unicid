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
	return dbResult[0]['id_usuario']

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

		dbResult = dbQuery(sql, (request.json['usuario'],))
		if len(dbResult) < 1:
			return failResult('Unauthenticated', 403)
		
		userData = dbResult[0]
		
		if bcrypt.checkpw(str(request.json['senha']).encode('utf-8'), str(userData['hash_senha']).encode('utf-8')):
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

		dbResult = dbQuery(sql, (request.json['chave_sessao'],))
		if len(dbResult) < 1:
			return failResult('Invalid session', 400)
		return successResult([])
	
	@app.route('/auth/reauth', methods=['POST'])
	def reauth():
		"""
			reautentica sessão, reobtendo os dados da mesma e extendendo validade

			inputs:
				chave_sessao
			outputs:
				success
				chave_sessao
				tipo
		"""

		try:
			uid = validateSession(request.json['chave_sessao'])

			sql = """
				UPDATE sessao
				SET expires_at = CURRENT_TIMESTAMP + INTERVAL '10 minute'
				WHERE
					chave = %s AND 
					expires_at > CURRENT_TIMESTAMP
				RETURNING chave;
			"""

			dbResult = dbQuery(sql, (request.json['chave_sessao'],))
			if len(dbResult) < 1 or 'chave' not in dbResult[0]:
				raise PermissionError('Unauthenticated')
			
			chave = dbResult[0]['chave']

			sql = """
			SELECT
				u.tipo
			FROM
				sessao s INNER JOIN usuario u ON u.id = s.id_usuario
			WHERE
				s.chave = %s;
			"""
			dbResult = dbQuery(sql, (chave,))

			return successResult([{
				'chave_sessao': chave,
				'tipo': dbResult[0]['tipo']
			}])
		except PermissionError as ex:
			return failResult(ex.args[0], 403)
	
