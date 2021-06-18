import os

basedir = os.path.abspath(os.path.dirname(__file__))

class Config:
	SECRET_KEY = os.environ.get(‘SECRET_KEY’, ‘secret’)
	STREAM_API_KEY = ‘mzaks492eeh5’#Insert your Stream API key here /#/ https://dashboard.getstream.io/dashboard/v2/organization/63794
	STREAM_SECRET = ‘ujthr2neyygb6udkfmn6jv3kzdyjzb4cnbemtsm7edvqkcfg8adaq5rad3e98e26’#Insert your Stream Secret here

	@staticmethod
	def init_app(app):
		pass

class DevelopmentConfig(Config):
	DEBUG = True
	SQLALCHEMY_DATABASE_URI = os.environ.get(‘DEV_DATABASE_URL’) or \
		‘sqlite:///’ + os.path.join(basedir, ‘data-dev.sqlite’)

class TestingConfig(Config):
	TESTING = True
	SQLALCHEMY_DATABASE_URI = os.environ.get(‘TEST_DATABASE_URL’) or \
		‘sqlite://’
	WTF_CSRF_ENABLED = False
class ProductionConfig(Config):
	SQLALCHEMY_DATABASE_URI = os.environ.get(‘DATABASE_URL’) or \
		‘sqlite:///’ + os.path.join(basedir, ‘data/sqlite’)

	@classmethod
	def init_app(cls, app):
		Config.init_app(app)

config = {
	‘development’: DevelopmentConfig,
	‘testing’: TestingConfig,
	‘production’: ProductionConfig,
	
	‘default’: DevelopmentConfig
} 