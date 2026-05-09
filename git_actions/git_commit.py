import requests as req

if __name__ == "__main__":
    try:
        print("Enter the repository ID: ")
        repo_id = int(input())

        print("Enter the commit message: ")
        message = input()

        req.post(
            url='http://localhost:3000/commits',
            data={
                "message": message,
                "repository_id": repo_id
            }
        )
        
    except Exception as e:
        print(f"Error to make commit. Error: {e}")