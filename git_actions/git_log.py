import requests as req

if __name__ == "__main__":
    try:
        print("Enter the repository ID: ")
        repo_id = int(input())

        response = req.get(
            url=f'http://localhost:3000/repositories/{repo_id}',
        )

        commits = response.json()['commits']

        print("Commit List:")
        for commit in commits:
            print(f"{commit['id']} - {commit['message']}")
    except Exception as e:
        print(f"Error get repository logs. Error: {e}")