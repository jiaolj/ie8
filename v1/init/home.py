# -*- coding: utf-8 -*-
from django.shortcuts import render_to_response

def index(req):
    active = 'index'
    return render_to_response('index.html',locals())
def knowledge(req):
    active = 'knowledge'
    return render_to_response('knowledge.html',locals())
