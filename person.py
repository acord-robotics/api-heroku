from flask import (
    make_response,
    abort,
)
from config import db
from models import (
    Person,
    PersonSchema,
)

def read_all(): # responds to the REST API URL endpoint GET /api/people 
    # Create the list of people from our data
    people = Person.query \
        .order_by(Person.lname \ 
        .all()

    # serialize the data for the response
    person_schema = PersonSchema(many=True)
    return person_schema.dump(people).data # returned and converted by Connexion to JSON as the response to the REST API call.

def read_one(person_id): # Make a request for a single person in the database
    person = Person.query \
        .filter(Person.person_id == person_id) \
        .one_or_none()

    if person is not None:
        person_schema = PersonSchema()
        return person_schema.dump(person).data
    else:
        abort(404, 'Person not found for Id: {person_id}'.format(person_id=person_id))

def create(person): # Create a person in the database
    fname = person.get('fname')
    lname = person.get('lname')

    existing_person = Person.query \
        .filter(Person.fname == fname) \
        .filter(Person.lname == lname) \
        .one_or_none()
 
    if existing_person is None:
        schema = PersonSchema()
        new_person = schema.load(person, session=db.session).data

        db.session.add(new_person)
        db.session.commit()

        return schema.dump(new_person).data, 201
    else:
        abort(409, f'Person {fname} {lname} exists already')