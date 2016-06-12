# -*- coding: utf-8 -*-
from django.shortcuts import render_to_response
from django.db import connection,connections
from models.news import News
from tools.func import to_json

def index(req):
    active = 'index'
    return render_to_response('index.html',locals())
def knowledge(req):
    active = 'knowledge'
    return render_to_response('knowledge.html',locals())
def getTpcs(cur,news_id):
    cur.execute('select d.id,d.name from news_topic as a,topic as b,topic_disease_info as c,disease_info as d where a.topic_id = b.id and a.topic_id=c.topic_id and c.disease_info_id=d.id and a.news_id=%s',[news_id])
    return [{'id':m[0],'name':m[1]} for m in cur.fetchall()]
def knowledge_get(req):
    back = {'status':'ok'}
    q = req.GET or req.POST
    kwd = q.get('kwd')
    fromNum = int(q.get('fromNum',0))
    limitNum = int(q.get('limitNum',20))
    cur = connection.cursor()
    if kwd:
        obj = News.objects.filter(title__contains=kwd)
    else:
        obj = News.objects.all()
    back['data'] = [{'pk':m.pk,'title':m.title,'topics':getTpcs(cur,m.pk),'url':m.url,'pubDate':m.pubDate.strftime('%Y-%m-%d')} for m in obj[fromNum:fromNum+limitNum]]
    back['count'] = obj.count()
    return to_json(back)
