### Updating the Image Used By a Deployment - Method #01

- **Steps:**
  - Make a change to your project code
  - Rebuild the image, specifying a new image version
  - Im the deployment config file, update the version of the image
  - Run the command: ` kubectl apply -f deployment_file_name`

### Updating the Image Used By a Deployment - Method #02

- **Steps:**
  - The deployment must be using the 'latest' tag in the pod spec section
  - Make an update to your code
  - Build the image
  - Push the image to Docker Hub
  - Run the command: `kubectl rollout restart deployment deployment_name`