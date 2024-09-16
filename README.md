# notifications-ui

## Requirements

Before running the project in Docker, ensure you have the following installed:

	•	Docker (version 20.9.0 or higher)

Steps to Run the Project

1. Clone the Repository

Start by cloning the repository to your local machine:
```sh
git clone https://github.com/your-username/your-repo.git
```
Navigate to the project folder:
```sh
cd your-repo
```

2. Build the Docker Image

In the project root, build the Docker image using the provided Dockerfile. This command will compile the project, create the production build, and prepare it for deployment using NGINX.

Run the following command:
```sh
docker build -t your-app-name .
```

3. Run the Docker Container

Once the image is built, you can run the container using the following command:
```sh
docker run -p 8080:80 your-app-name
```
Now, you can access the project by opening your browser and navigating to:
```sh
http://localhost:8080
```
