import django
from django.http import HttpResponseRedirect, HttpResponse, JsonResponse
from django.shortcuts import render
from django.views.generic import View
from django.db import connection
from django.core import serializers
from apps.models.users import Users
import json
import datetime
import math


class LoginView(View):
    # simplest login vulnerable to SQLi
    def login1(self, request):
        sql_query = '''SELECT * FROM apps_users WHERE username='{}' AND password='{}';'''.format(
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

    # escape single quotes
    def escape(self, string):
        return string.replace("'", "''")

    # secure login1
    def login2(self, request):
        sql_query = '''SELECT * FROM apps_users WHERE username='{}' AND password='{}';'''.format(
            self.escape(json.loads(request.body).get('username')),
            self.escape(json.loads(request.body).get('password'))
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

    # login function using ORM
    def login3(self, request):
        request_username = json.loads(request.body).get('username')
        request_password = json.loads(request.body).get('password')

        queryset = Users.objects.filter(username__exact=request_username).filter(
            password__exact=request_password)

        response = []
        for record in queryset:
            data = {
                'user_id': record.user_id,
                'username': record.username,
                'password': record.password,
                'email': record.email,
                'user_info': record.user_info
            }
            response.append(data)

        print(response)

        return JsonResponse({
            'user': response
        })

    def post(self, request, id):
        if id == 1:
            response = self.login1(request)
        elif id == 2:
            response = self.login2(request)
        elif id == 3:
            response = self.login3(request)

        return response
