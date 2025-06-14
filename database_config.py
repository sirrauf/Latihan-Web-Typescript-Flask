from pony.orm import Database

db = Database()
db.bind(
    provider='mysql',
    host='localhost',
    user='root',
    passwd='',
    db='latihan_typescript_flask'
)
