import os
BASE_DIR = os.path.dirname(os.path.dirname(__file__))
SECRET_KEY = '#)1_b=*kspc$y!freef-8dbc(e!dl_dpi06kx^3f-7gvc(oms('
DEBUG = True
TEMPLATE_DEBUG = True
ALLOWED_HOSTS = []
INSTALLED_APPS = (
    #'django.contrib.contenttypes',
    #'django.contrib.sessions',
    #'django.contrib.messages',
    'django.contrib.staticfiles',
    'corsheaders',
)
MIDDLEWARE_CLASSES = (
    #'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    #'django.contrib.auth.middleware.AuthenticationMiddleware',
    #'django.contrib.messages.middleware.MessageMiddleware',
    #'django.middleware.clickjacking.XFrameOptionsMiddleware',
)
CORS_ORIGIN_ALLOW_ALL = True
CORS_ORIGIN_WHITELIST = (
    'localhost',
)
ROOT_URLCONF = 'init.urls'
LANGUAGE_CODE = 'zh-cn' 
DEFAULT_CHARSET = 'UTF-8'
WSGI_APPLICATION = 'conf.wsgi.application'
STATIC_ROOT = os.path.join(BASE_DIR, 'static')
#STATIC_ROOT = ''
TEMPLATE_DIRS = (
    os.path.join(BASE_DIR, 'templates').replace('\\', '/'),
)
ip = '114.215.192.135'
mysql_uname = 'liangzhi'
mysql_passwd = 'liangzhi'
DATABASES = {
   'default': {
         'ENGINE': 'django.db.backends.mysql',
         'NAME': 'CrawlerDB',
         'USER': mysql_uname,
         'PASSWORD': mysql_passwd,
         'HOST': ip,
         'charset': 'utf8',
   },
}
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'Asia/Shanghai'
USE_I18N = True
USE_L10N = True
USE_TZ = True
STATIC_URL = '/static/'
STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'static').replace('\\', '/'),
)
#SESSION_ENGINE = 'django.contrib.sessions.backends.cache'
#SESSION_ENGINE = 'django.contrib.sessions.backends.file'
#SESSION_FILE_PATH = '/var/www/session/'
#SESSION_COOKIE_AGE=3600*24
