MenCare – Helm-based Kubernetes Deployment

A 3-tier application deployed on Kubernetes using Helm, consisting of a frontend, backend API, and MySQL database, exposed via Ingress.
The project is developed and tested locally using kind + nginx ingress and is designed to be extended to AWS EKS with ALB.

- Architecture Overview
User (Browser)
   ↓
Ingress (nginx)
   ↓
Frontend Service
   ↓
Frontend Pods
   ↓
Backend Service
   ↓
Backend Pods
   ↓
MySQL Database

- Tech Stack

Docker (containerization)
Kubernetes (kind locally, EKS planned)
Helm (deployment & configuration)
Nginx Ingress Controller
MySQL
Git & GitHub

📂 Repository Structure
men-care-helm-k8s/
├── Chart.yaml
├── values.yaml
├── README.md
└── templates/
    ├── frontend-deployment.yaml
    ├── frontend-service.yaml
    ├── backend-deployment.yaml
    ├── backend-service.yaml
    ├── mysql-statefulset.yaml
    └── ingress.yaml

✅ Prerequisites

- Make sure the following are installed on your system:

Docker
kubectl
Helm (v3+)
kind
Git
Windows with WSL2 (or Linux/macOS)

- Verify versions:

docker --version
kubectl version --client
helm version
kind version

🚀 Installation & Setup Guide (Local)
Step 1: Create Kubernetes Cluster using kind
kind create cluster --name mencare

Verify:

kubectl get nodes

Step 2: Install Nginx Ingress Controller
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/kind/deploy.yaml

Wait until ingress pods are running:

kubectl get pods -n ingress-nginx

Step 3: Clone Repository
git clone https://github.com/<your-username>/men-care-helm-k8s.git
cd men-care-helm-k8s

Step 4: Install Application using Helm
helm install mencare . -n mencare --create-namespace

Verify resources:

kubectl get pods -n mencare
kubectl get svc -n mencare
kubectl get ingress -n mencare

Step 5: Port-forward Ingress Controller
kubectl port-forward -n ingress-nginx svc/ingress-nginx-controller 8080:80

Step 6: Configure Local DNS (Windows)
Open Notepad as Administrator and edit:
C:\Windows\System32\drivers\etc\hosts

Add:
127.0.0.1 mencare.local (Works the same for everyone.)

Flush DNS:
ipconfig /flushdns

Step 7: Access Application

Open browser:
http://mencare.local:8080

- For Linux steps (Ubuntu / RHEL / Amazon Linux)
Get EC2 public IP
From AWS Console → EC2 → Instance → Public IPv4 address or EC2 Public DNS

✅ Application should load successfully.
