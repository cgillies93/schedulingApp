import os
from flask import Flask, jsonify, url_for, redirect, request, abort
import json
import babel
import dateutil.parser
from datetime import date
from flask_cors import CORS

from .database.models import db_drop_and_create_all, setup_db, Appointment

app = Flask(__name__)
setup_db(app)
cors = CORS(app)

#db_drop_and_create_all()

@app.after_request
def after_request(response):
    response.headers.add("Access-Control-Allow-Headers",
                         "Content-Type, Authorization, true")
    response.headers.add("Access-Control-Allow-Methods",
                         "GET, POST, PATCH, DELETE, OPTIONS")

    return response

@app.route('/', methods=['GET'])
def appointments():
    appointments = Appointment.query.all()
    formatted_apts = [appointment.format() for appointment in appointments]
    try:

        return jsonify({
            'success': True,
            'appointments': formatted_apts,
            'number_of_appointments': len(Appointment.query.all())
        }), 200
    except:
        abort(404)

@app.route('/', methods=['POST'])
def add_appointment():
    data = request.get_json()
    pet_name = data['pet_name']
    owner_name = data['owner_name']
    notes = data['notes']
    date = data['date']

    try:
        new_apt = Appointment(pet_name=pet_name, owner_name=owner_name,
                              notes=notes, date=date)
        new_apt.insert()

        return jsonify({
            'success': True,
            'created': new_apt.id
        }), 201
    except:
        abort(400)

@app.route('/<int:apt_id>', methods=['PATCH'])
def edit_appointment(apt_id):
    appointment = Appointment.query.filter(Appointment.id == apt_id).first()
    data = request.get_json()

    for key in data.keys():
        if data[key] is None:
            data.pop(key)

    if 'petName' in data:
        appointment.pet_name = data['petName']

    if 'ownerName' in data:
        appointment.owner_name = data['ownerName']

    if 'aptNotes' in data:
        appointment.notes = data['aptNotes']

    if 'aptDate' in data:
        appointment.date = data['aptDate']

    try:

        appointment.update()

        return jsonify({
            'success': True,
            'updated': appointment.id
        }), 200

    except:
        abort(404)

@app.route('/', methods=['DELETE'])
def delete_appointment():
    apt = request.get_json()
    print(apt)
    apt_id = apt['id']
    appointment = Appointment.query.filter(Appointment.id == apt_id).first()

    try:
        appointment.delete()

        return jsonify({
            'success': True,
            'deleted': appointment.id
        }), 200
    except:
        abort(404)
