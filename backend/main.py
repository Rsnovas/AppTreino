from xml.etree.ElementTree import tostring

from flask import request, jsonify
from config import app, db
from models import User, Game
from datetime import datetime


@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    json_users = list(map(lambda user: user.to_json(), users))
    return jsonify({"users": json_users})


@app.route('/create-user', methods=['POST'])
def create_user():

    print(request.json)
    new_user = User(
        name=request.json.get("name"),
        user_name=request.json.get("userName"),
    )

    try:
        db.session.add(new_user)
        db.session.commit()
    except Exception as e:
        return jsonify({"error": str(e)}), 400

    return jsonify({"user": new_user.to_json()}), 201


@app.route('/update-user/<int:user_id>', methods=['PATCH'])
def update_user(user_id):

    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404


    user.name = request.json.get("name" , user.name)
    user.user_name = request.json.get("userName", user.user_name)

    try:
        db.session.commit()
    except Exception as e:
        return jsonify({"error": str(e)}), 400

    return jsonify({"user": user.to_json()}), 200


@app.route('/delete-user/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get(user_id)
    try:
        db.session.delete(user)
        db.session.commit()

    except Exception as e:
        return jsonify({"error": str(e)}), 400

    return jsonify({"user": user.to_json()}), 200


@app.route('/get-games-by-user-id/<int:user_id>', methods=['GET'])
def get_games_by_id(user_id):
    games = db.session.query(Game.id, Game.name, Game.genre, Game.purchase_date, User.name).join(User).filter(Game.user_id == user_id)
    json_games = [
        {"gameId": g[0], "gameName": g[1], "gameGenre": g[2],  "purchaseDate": g[3],"userName": g[4] }
        for g in games
    ]
    return jsonify({"games": json_games}), 200


@app.route('/add-game-to-user', methods=['POST'])
def add_game_by_id():
    print(request.json)
    game = Game(
        user_id = request.json.get("userId"),
        name = request.json.get("gameName"),
        genre = request.json.get("gameGenre"),
        purchase_date = datetime.now()
    )
    try:
        db.session.add(game)
        db.session.commit()
        return jsonify("Game added"), 201
    except Exception as e:
        return jsonify("Failed to add game"), 400


if __name__ == '__main__':
    with app.app_context():
        db.create_all()

    app.run(debug=True)


