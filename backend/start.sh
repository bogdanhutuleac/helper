source env/bin/activate
sudo systemctl start mongod
uvicorn app.app:app --reload
