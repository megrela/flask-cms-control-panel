import base64
import hashlib


def auth(client_id, token):
    client_secret_key = "adertyuio"
    phrase = client_id + client_secret_key
    encoded = base64.b64encode(bytes(phrase, encoding="utf8"))
    hash_object = hashlib.sha256(encoded)
    hash_string = hash_object.hexdigest()
    return hash_string == token
