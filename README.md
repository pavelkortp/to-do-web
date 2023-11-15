**TODO** program.

Task list realisation.
The logic of working with tasks is centered on the server, and only requests are sent to the front end. 
The front end server is separate and runs on port 8080.

The program can add, delete, edit, and mark tasks. There is also support for accounts, each user can register in the system and save all their tasks. MongoDB is used for data storage.

The server has 2 versions of the api: v1 works with routing, and v2 with query. Both versions are ready to use. 

There is also support for unregistered users, their data (tasks) are stored in the session for 24 hours.



To run, you need to install the listed modules in package.json
and execute the v2 script (if you want the 2nd version of the api). Note: the front end is configured for api version 2, so that requests are sent to api/v1, you need to change apiVersion: 'v2' to 'v1' in the **scrypt.js** file.
