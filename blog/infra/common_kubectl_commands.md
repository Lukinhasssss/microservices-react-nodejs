### Common Kubectl Commands

- Print out information about all of the running pods
  - ```bash
    kubectl get pods
    ```
- Execute the given command in a running pod
  - ```bash
    kubectl exec -it pod_name cmd
    ```
- Print out logs from the given pod
  - ```bash
    kubectl logs pod_name
    ```
- Deletes the given pod
  - ```bash
    kubectl delete pod pod_name
    ```
- Tells kubernetes to process the config
  - ```bash
    kubectl apply -f config_file_name
    ```
- Print out some information about the running pod
  - ```bash
    kubectl describe pod pod_name
    ```