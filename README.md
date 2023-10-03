### Another js datatable

This is an example of table written in vanilla javascript. To interact with it, follow the next steps:
- Clone repo
  ```shell
  git clone https://github.com/hameos/hameostable.git
  cd hameostable
  ```
- From the root folder hameostable run the next command:
    ```shell
    docker run -it -u $(id -u) --rm -p 4000:4000 -v $PWD:/hameos/datatable node:18 \
                /bin/sh -c "cd /hameos/datatable; npm i; npm run demo"
    ```

- Open browser and go to url `localhost:4000`

