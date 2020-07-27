import os
from sqlalchemy import Column, String, Integer, DateTime
from flask_sqlalchemy import SQLAlchemy
import json

database_filename = 'database.db'
project_dir = os.path.dirname(os.path.abspath(__file__))
database_path = "sqlite:///{}".format(os.path.join(project_dir, database_filename))

db = SQLAlchemy()

def setup_db(app):
    app.config['SQLALCHEMY_DATABASE_URI'] = database_path
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.app = app
    db.init_app(app)

def db_drop_and_create_all():
    db.drop_all()
    db.create_all()

#Models

class Appointment(db.Model):
    id = Column(Integer().with_varient(Integer, 'sqlite'), primary_key=true)
    pet_name = Column(String(50), nullable=false)
    owner_name = Column(String(50), nullable=false)
    notes = Column(String())
    date = Column(DateTime(), nullable=false)

    def insert(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def __repr__(self):
        return json.dumps(self)
