### Deployment Commands

- List all running deployments
  - ```bash
    kubectl get deployments
    ```
- Print out details about a specific deployment
  - ```bash
    kubectl describe deployment deployment_name
    ```
- Create a deployment out of a config file
  - ```bash
    kubectl apply -f config_file_name
    ```
- Delete a deployment
  - ```bash
    kubectl delete deployment deployment_name
    ```