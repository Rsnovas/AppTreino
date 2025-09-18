"""

###########################################################################

DON'T EXECUTE THIS CODE, this is used only as a coding reference

###########################################################################


from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///example.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# ------------ Models ------------
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    items = db.relationship('Item', backref='user', lazy=True)

class Item(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

# ------------ Routes ------------

@app.route('/create-user/<username>', methods=['POST'])
def create_user(username):
    user = User(username=username)
    db.session.add(user)
    db.session.commit()
    return jsonify(message=f"User '{username}' created", user_id=user.id)

@app.route('/add-item/<int:user_id>', methods=['POST'])
def add_item(user_id):
    data = request.get_json()
    item_name = data.get('name')

    user = User.query.get(user_id)
    if not user:
        return jsonify(error="User not found"), 404

    item = Item(name=item_name, user=user)
    db.session.add(item)
    db.session.commit()
    return jsonify(message=f"Item '{item.name}' added to user '{user.username}'")

@app.route('/user-items/<int:user_id>', methods=['GET'])
def get_user_items(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify(error="User not found"), 404

    items = [{'id': item.id, 'name': item.name} for item in user.items]
    return jsonify(username=user.username, items=items)

# ------------ Init DB ------------
@app.before_first_request
def create_tables():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)


"""