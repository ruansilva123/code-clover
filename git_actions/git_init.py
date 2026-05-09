import requests as req

if __name__ == "__main__":
    try:
        print("Enter the user ID: ")
        user_id = int(input())

        print("Enter the repository name: ")
        name = str(input())

        payload = req.post(
            url='http://localhost:3000/repositories',
            json={
                "name": name,
                "user_id": user_id
            }
        )

        print("Repository created in origin...", payload.text)
    except Exception as e:
        print(f"Error to create repository. Error: {e}")
