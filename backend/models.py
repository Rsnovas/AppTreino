from config import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    user_name = db.Column(db.String(80), unique=True, nullable=False)
    list_games = db.relationship('Game', backref='user', lazy=True)

    def __init__(self, name, user_name):
        self.name = name
        self.user_name = user_name


    def to_json(self):
        return {
            "id": self.id,
            "name": self.name,
            "userName": self.user_name
        }


class Game(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    purchase_date = db.Column(db.DateTime, nullable=False)
    genre = db.Column(db.String(80), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def __init__(self, name, purchase_date, genre, user_id):
        self.name = name
        self.purchase_date = purchase_date
        self.genre = genre
        self.user_id = user_id
