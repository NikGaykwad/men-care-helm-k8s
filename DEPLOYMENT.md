# Deployment Guide

This guide covers how to deploy the Men's Hair Care App using Docker Compose (for local development/testing) and Kubernetes (for scalable production-like environments).

## Prerequisites
- Docker & Docker Compose installed.
- Minikube or any Kubernetes cluster access.
- `kubectl` CLI tool installed.

## 1. Docker Compose (Local)

To run the entire stack (Frontend, Backend, MySQL) locally:

```bash
docker-compose up --build
```

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Database**: Port 3306

To stop:
```bash
docker-compose down
```

## 2. Kubernetes (Scalable)

### Step 1: Build Docker Images
If using Minikube, point your shell to Minikube's Docker daemon so it can find the images:
```bash
eval $(minikube docker-env)
```

Build the images locally:
```bash
docker build -t men-haircare-backend:latest ./backend
docker build -t men-haircare-frontend:latest ./frontend
```

### Step 2: Apply Manifests
Navigate to the `k8s` folder and apply the configuration:

```bash
# 1. Secrets & ConfigMaps
kubectl apply -f k8s/mysql-secret.yaml
kubectl apply -f k8s/mysql-configmap.yaml

# 2. Database
kubectl apply -f k8s/mysql-deployment.yaml

# 3. Backend
kubectl apply -f k8s/backend-deployment.yaml

# 4. Frontend
kubectl apply -f k8s/frontend-deployment.yaml
```

### Step 3: Access the App
Check the status of your pods:
```bash
kubectl get pods
```

To access the frontend service (NodePort):
```bash
minikube service frontend
```

Or port-forward manualy:
```bash
kubectl port-forward service/frontend 3000:80
```
Then visit http://localhost:3000.

### Scaling
To scale the backend to 5 replicas:
```bash
kubectl scale deployment/backend --replicas=5
```
