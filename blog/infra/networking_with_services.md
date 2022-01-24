### Services

 - Services provide networking *between* pods and from the outside world to a pod
 - **Types of Services:**
  - **Cluster IP:** Sets up an easy-to-remember URL to access a pod. Only exposes pods *in the cluster*
  - **Node Port:** Makes a pod accesible from *outside the cluster*. Usually only used for dev purposes
  - **Load Balancer:** Makes a pod accesible from *outside the cluster*. This is the right way to expose a pod to the outside world
  - **External Name:** Redirects an in-cluster request to a CNAME URL