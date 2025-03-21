# My Frontend Application

This is a frontend application built with React Typescript.

## Running the Application with Docker

### Prerequisites

- Docker installed on your machine.

### Steps (Using Docker Compose)

1. **Clone the repository:**
    git clone https://github.com/samcode-dev/sam-innoscripta-frontend-challenge.git
    cd into the project directory

2. **Build the Docker image:**
    docker-compose up -d    

3. **Access the application:**
    Open your browser and navigate to http://localhost


### Steps (From Docker Hub)

1. **Pull the image:**
    docker pull samflodan/sam-innoscripta-news-app:latest  

2. **Run the container:**
    docker run -d -p 80:80 --name news-app-container samflodan/sam-innoscripta-news-app:latest

3. **Access the application:**
    Open your browser and navigate to http://localhost


**Stopping the Container or if port is already in use:**

1. **Find the container ID:**
    docker ps

2. **Stop the container:**
    docker stop <container-id>


**Removing the Container and Image:**

1. **Remove the container:**
    docker rm <container-id>

2. **Remove the image:**
    docker rmi my-frontend-app