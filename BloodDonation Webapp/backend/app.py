from flask import Flask, redirect, url_for, session, jsonify
from authlib.integrations.flask_client import OAuth
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)  # ✅ Allow Cross-Origin Requests

app.secret_key = os.getenv("SECRET_KEY", "bloodaid")

# OAuth setup
oauth = OAuth(app)

google = oauth.register(
    name='google',
    client_id='286158199169-kh2dfutosla1o3po6b21hss490o8eac7.apps.googleusercontent.com',
    client_secret='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',
    access_token_url='https://oauth2.googleapis.com/token',
    authorize_url='https://accounts.google.com/o/oauth2/auth',
    client_kwargs={'scope': 'openid email profile'}
)

# 📌 Login Route (Flask backend on 5000)
@app.route('/login')
def login():
    return google.authorize_redirect("http://127.0.0.1:5000/auth/google/callback")  # ✅ Google handles login

# 📌 Google OAuth Callback (Redirects to `app.html` on 5500)
@app.route('/auth/google/callback')
def authorized():
    token = google.authorize_access_token()
    user_info = google.parse_id_token(token)

    # ✅ Store user info in session
    session['user'] = user_info

    # 🔄 Redirect user to Frontend Dashboard (`app.html` on 5500)
    return redirect("http://127.0.0.1:5500/app.html")  # ✅ Redirects to the correct page

# 📌 Logout Route (Redirects to Home)
@app.route('/logout')
def logout():
    session.pop('user', None)
    return redirect("http://127.0.0.1:5500/")  # ✅ Redirects back to home after logout

# 📌 API Route to Fetch User Data (For Frontend)
@app.route('/get_user')
def get_user():
    return jsonify({"user": session.get('user', None)})  # ✅ Returns user info if logged in

if __name__ == '__main__':
    app.run(debug=True, port=5000)  # ✅ Flask running on port 5000
