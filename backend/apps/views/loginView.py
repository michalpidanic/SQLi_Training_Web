import django
from django.http import HttpResponseRedirect, HttpResponse, JsonResponse
from django.shortcuts import render
from django.views.generic import View
from django.db import connection
import json
import datetime
import math


class LoginView(View):
    # simplest login vulnerable to SQLi
    def login1(self, request):
        sql_query = '''SELECT * FROM users WHERE username='{}' AND password='{}';'''.format(
            json.loads(request.body).get('username'),
            json.loads(request.body).get('password')
        )

        # performing DB request
        with connection.cursor() as cursor:
            def dictfetchall(cursor):
                columns = [col[0] for col in cursor.description]
                return [
                    dict(zip(columns, row))
                    for row in cursor.fetchall()
                ]

            cursor.execute(sql_query)
            response = dictfetchall(cursor)

        return JsonResponse({
            'user': response
        })

    # secure login1
    def login2(self, request):
        return

    def post(self, request, id):
        if id == 1:
            response = self.login1(request)
        elif id == 2:
            response = self.login2(request)

        return response
