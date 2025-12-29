# 🧴 MenCare – Helm-based Kubernetes Deployment

A **Production-style 3-tier application** deployed on Kubernetes using **Helm**, consisting of a **React frontend**, **Node.js backend API**, and **MySQL database**, exposed through **Ingress**.

The project is **developed and tested locally using kind + Nginx Ingress** and is **designed to be extended to AWS EKS using ALB Ingress**.

This repo is ideal for:

- Learning Helm the right way
- Understanding real-world Kubernetes app structure
- Practicing DevOps deployment workflows end to end

---

## 🏗️ Architecture Overview

```

User (Browser)
↓
Ingress (Nginx)
↓
Frontend Service
↓
Frontend Pods (React)
↓
Backend Service
↓
Backend Pods (Node.js / Express)
↓
MySQL (StatefulSet)

```

**Tier Breakdown**

- **Presentation Tier**: React frontend
- **Application Tier**: Node.js backend API
- **Data Tier**: MySQL database

---

## 🧰 Tech Stack

**Application**

- Frontend: React (Vite), Vanilla CSS (Premium UI)
- Backend: Node.js, Express
- Database: MySQL

**DevOps / Infra**

- Docker (containerization)
- Kubernetes (kind locally, EKS planned)
- Helm (templated deployments)
- Nginx Ingress Controller
- Git & GitHub

---

## 📂 Repository Structure

```

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

```

---

## ✅ Prerequisites

Make sure the following tools are installed:

- Docker
- kubectl
- Helm (v3+)
- kind
- Git
- Windows with WSL2 (or Linux/macOS)

### Verify versions

```bash
>>>>>>> 77bd906 (New Readme.me)
docker --version
kubectl version --client
helm version
kind version

```

---

## 🚀 Installation & Setup (Local – kind)

### Step 1: Create Kubernetes Cluster

```bash
kind create cluster --name mencare
```

Verify:

```bash
kubectl get nodes
```

---

### Step 2: Install Nginx Ingress Controller

```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/kind/deploy.yaml
```

Wait until pods are running:

```bash
kubectl get pods -n ingress-nginx
```

---

### Step 3: Clone Repository

```bash
git clone https://github.com/NikGaykwad/men-care-helm-k8s.git
cd men-care-helm-k8s
```

---

### Step 4: Install Application Using Helm

```bash
helm install mencare . -n mencare --create-namespace
```

Verify resources:

```bash
kubectl get pods -n mencare
kubectl get svc -n mencare
kubectl get ingress -n mencare
```

---

### Step 5: Port-forward Ingress Controller

```bash
kubectl port-forward -n ingress-nginx svc/ingress-nginx-controller 8080:80
```

---

### Step 6: Configure Local DNS (Windows)

Open **Notepad as Administrator** and edit:

```
C:\Windows\System32\drivers\etc\hosts
```

Add:

```
127.0.0.1 mencare.local
```

Flush DNS:

```bash
ipconfig /flushdns
```

> This hostname works the same for everyone using this project.

---

### Step 7: Access Application

Open browser:

```
http://mencare.local:8080
```

✅ Application should load successfully.

---

## 🐧 Linux / EC2 Access Notes

If running on Linux or EC2:

- Use **EC2 Public IP or Public DNS**
- Ensure port `80/8080` is allowed in Security Groups

Example:

```
http://<EC2-PUBLIC-IP>
```

---

## 🔧 Configuration via Helm

All environment-specific values are managed in:

```
values.yaml
```

You can easily create:

- `values-dev.yaml`
- `values-qa.yaml`
- `values-prod.yaml`

Example:

```bash
helm install mencare . -f values-dev.yaml -n mencare
```

---

## 📈 Future Enhancements (Recommended)

- Migrate kind → **AWS EKS**
- Replace Nginx Ingress with **AWS ALB Ingress Controller**
- Use **AWS RDS** instead of MySQL StatefulSet
- Add **CI/CD (GitHub Actions / Jenkins)**
- Add **Secrets via AWS Secrets Manager**
- Add **Monitoring (Prometheus + Grafana)**
- Enable **HPA & Auto Scaling**
- Use **Helmfile or ArgoCD** for GitOps

---

## 🧠 Key Learnings from This Project

- Real Helm chart structuring
- Ingress-based routing
- Kubernetes service-to-service communication
- Stateful vs stateless workloads
- Environment-agnostic deployments
- Production-style DevOps thinking
