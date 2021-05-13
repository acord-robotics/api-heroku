# https://www.notion.so/skinetics/Gemini-Station-15c17fe702ca4e718435a655bdcc0d7c#0814978a939846fcb105e4363dd08486
from datetime import datetime
from config import db, ma

class Character(db.Model):
    __tablename__ = 'character'
    character_id = db.Column(db.Integer, primary_key=True)
    characterName = db.Column(db.String(32), index=True)
    timestampSignedup = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    trades = db.relationship(
        'Trades',
        backref='character',
        cascade='all, delete, delete-orphan',
        single_parent=True,
        order_by='desc(Trade.timestamp)'
        )

class Trade(db.Model):
    __tablename__ = 'trades'
    trade_id = db.Column(db.Integer, primary_key=True)
    person_id_from = db.Column(db.Integer, db.ForeignKey('person.person_id'))
	#person_id_to = db.Column(db.Integer, db.ForeignKey('person.person_id'))
    status = db.Column(db.Bool, nullable=False)
    timestamp = db.Column(
        db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow
    )