from django.conf.urls import patterns, url
from conf.settings import STATIC_ROOT

urlpatterns = patterns('init.home',
    url(r'^$', 'index'),
    url(r'^knowledge/$', 'knowledge'),
    url(r'^knowledge/get$', 'knowledge_get'),
)
#urlpatterns += patterns('',url(r'^static/(?P<path>.*)$', 'django.views.static.serve', { 'document_root': STATIC_ROOT,}),)
urlpatterns += patterns('',url(r'^(?P<path>.*)$', 'django.views.static.serve', { 'document_root': STATIC_ROOT,}),)