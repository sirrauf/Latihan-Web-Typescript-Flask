from pony.orm import Required, PrimaryKey
from database_config import db

class User(db.Entity):
    id = PrimaryKey(int, auto=True)
    full_name = Required(str)
    address = Required(str)
    email = Required(str, unique=True)
    password = Required(str)
    role = Required(str)  

db.generate_mapping(create_tables=True)
