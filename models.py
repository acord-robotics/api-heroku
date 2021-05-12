from datetime import datetime # https://www.notion.so/skinetics/Gemini-Station-15c17fe702ca4e718435a655bdcc0d7c
from config import db, ma

class Person(db.Model):
    __tablename__ = 'person'
    person_id = db.Column(db.Integer, primary_key=True)
    lname = db.Column(db.String(32), index=True)
    fname = db.Column(db.String(32))
    timestamp = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    notes = db.relationship(
        'Note',
        backref='person',
        cascade='all, delete, delete-orphan',
        single_parent=True,
        order_by='desc(Note.timestamp)'
        )

class Note(db.Model):
    __tablename__ = 'note'
    note_id = db.Column(db.Integer, primary_key=True)
    person_id = db.Column(db.Integer, db.ForeignKey('person.person_id'))
    content = db.Column(db.String, nullable=False)
    timestamp = db.Column(
        db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow
    )

class PersonSchema(ma.ModelSchema):
    class Meta:
        model = Person
        sqla_session = db.session
    notes = fields.Nested('PersonNoteSchema', default=[], many=True)

class PersonNoteSchema(ma.ModelSchema):
    note_id = fields.Int()
    person_id = fields.Int()
    content = fields.Str()
    timestamp = fields.Str()

class NoteSchema(ma.ModelSchema):
    class Meta:
        model = Note
        sqla_session = db.session
    person = fields.Nested('NotePersonSchema', default=None)

class NotePersonSchema(ma.ModelSchema):
    person_id = fields.Init()
    lname = fields.Str()
    fname = fields.Str()
    timestamp = fields.Str()