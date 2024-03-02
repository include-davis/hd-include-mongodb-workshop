# Setting Up Your Development Environment

Before you begin, create a folder for this team wherever you want to store any GitHub repos that you will be cloning on your device in this cohort. You can name it include, platform_team, or literally anything you want to. If you choose to name it "include", **do not use a '#' in your folder name**, it'll cause a bunch of problems later.

## 1. NODE.JS

Node.js is a runtime environment that is used to run Javascript code. It comes with the Node Package Manager (npm) that helps us manage the Javascript packages used in our project. To set up node.js:

1. Download the Node.js installer for your OS from https://nodejs.org/en/download/current
2. Run the installer and follow the installation wizard.
3. Once the installation finishes, open a terminal on VSCode and type _node --version_ to verify your node installation. Type _npm --v_ to verify your npm installation.

   a. If you get an error saying that node or npm is not recognized as a command, try restarting VSCode to see if the issue fixes itself. (If you had VSCode opened while installing Node, this should fix it.)
   b. If the problem persists, search for _Environment variables_ in your Start menu. Click on _Edit your Environment variables_. Click on _Environment Variables_ in the new window that opens up.
   c. Find the variable _Path_ and click on _Edit_.
   d. Check for _C:\Program Files\nodejs\\_ in the list of paths that appear. If it's not there, click on _New_ and add it to the list.
   e. Restart VSCode and it should ideally work now.

**If you already have node**  
Try to update your node version to roughly v21.1.0 so you don't get random warnings.

## 2. ESLINT EXTENSION

ESLint is an extension that ensures that your code adheres to certain code style. It also auto-formats your code on save in VSCode. To enable it:

1. Go to the Extensions tab on VSCode and install _ESLint_.
2. Once it is installed, open your Command Palette by pressing **Ctrl + SHift + P**/**Command + Shift + P** and search for **Preferences: Open Workspace Settings (JSON)**. Open the file and add this code into the file. This will autoformat your code on save and also configure tab sizes:

   ```json
   {
       "editor.codeActionsOnSave": {
           "source.fixAll.eslint": "explicit"
       },
       "eslint.validate": [
           "javascript",
           "typescript",
       ],
       "[javascriptreact]": {
           "editor.indentSize": 2
       },
       "[javascript]": {
           "editor.indentSize": 2
       },
       "[typescriptreact]": {
           "editor.indentSize": 2
       },
       "[typescript]": {
           "editor.indentSize": 2
       },
       "[jsonc]": {
           "editor.indentSize": 2
       },
   }
   ```

## 3. MongoDB
### 3.1 Installation
To get MongoDB set up locally, you'll need to install MongoDB on your machine along with mongosh (the command line tool for MongoDB). Then, you'll also need MongoDBCompass to view your database with a new interface. **The goal is to have mongosh working, once that works, other parts of the tutorial are optional.**
- Install MongoDB on Mac: https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/
- Install MongoDB on Windows: https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/
- https://www.mongodb.com/products/tools/compass


### 3.2 Database and User setup
Inside MongoDB Compass, connect to the client and create a new database using the plus sign near the Database part of the sidebar menu. For collections, just name it anything since it will be deleted later.

You will also need to create a user that has a username, password, and dbOwnership role using the mongo shell (mongosh). To enter your mongo shell, type `mongosh` into your terminal.
To switch to your newly created database:
```bash
use <DBNAME>
```
Replace `<DBNAME>` with the actual name of your database. (remove the angle brackets, they're just there for me to show that this is replaceable)

Then, to create a user that has ownership of the database:
```js
db.createUser({
   user: "<USERNAME>",
   pwd: "<PASSWORD>",
   roles: ['dbOwner']
})
```

### 3.3 Connecting with the Codebase
If that worked, then you should be ready to connect using the codebase! To do so, create a file called `.env` in the root of the repository (same level as package.json) and input the following:
```
MONGO_USERNAME=<USERNAME>
MONGO_PASSWORD=<PASSWORD>
MONGO_DB_HOST=127.0.0.1:27017/<DBNAME>
```
Replace `<USERNAME>, <PASSWORD>, <DBNAME>` with the actual username, password, and database names. (Don't include the angle brackets).

### 3.4 Testing & Initialization
Do this after the getting started portion (right after this section)

Assuming you have already run `npm install` and `npm run dev` is producing a web page for you to view, you can continue with this part. You will be running the `npm run init` command which will **wipe your database** and initialize it with a `pokemon` and `trainers` collection. In the future, you can edit this initialization in the `_utils/db/dbInit.js` file. If this works, then your MongoDB Compass (after a refresh) should display that your database has these two collections. This means everything is working!

## Getting Started
Set up:

`npm install` for package installations. This will install all packages specified in the package.json file.

Run the development server:

```bash
npm run dev
```

Run a linting test:

```bash
npm run lint
```

## Serverless Functions
To create your API from serverless functions, go to the `api` folder. There should be a `_utils` folder which will be used to define global utility functions. I defined three folders: `mongodb`, `request`, and `response`. These are designed such that all database related utility functions are defined in `db`, request processing related functions will be in `request`, and response related utility such as custom Errors are defined in `reponse`.

You'll see that there are folders defined with square brackets around the name such as `[id]`. These are dynamic routes and they work on the frontend as well. 

**Resources**
- https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes
- https://restfulapi.net/http-methods/
- https://medium.com/@nadinCodeHat/rest-api-naming-conventions-and-best-practices-1c4e781eb6a5

## MongoDB
MongoDB is our database system and in order to use it to create an easy to use REST API, I defined a couple of helper functions that you may use for your projects. Before I get into those, I'll link a few resources for you to read up on for CRUD with MongoDB. To be honest, these may not be the best resources, but they are a place to start. 

Take a look at embeddings, relations, crud, and aggregations. Like always, if you are reading through docs and find terms you don't know, look them up so you can truly understand what's going on. If you do this for long enough, you'll build up an internal database of knowledge that carries into future projects, thus saving time!

**resources**
- https://www.mongodb.com/docs/manual/applications/data-models-relationships/
- https://www.mongodb.com/docs/manual/crud/
- https://www.mongodb.com/docs/drivers/node/current/fundamentals/aggregation/

## Helper Functions
By now, I hope you have an understanding of the general syntax of crud operations. The main priority of writing the API is to keep the API simple to use. A secondary concern is making the logic behind the scenes (inside the serverless fucntions) easy to write as well. To solve both issues, I created some helper functions that mainly serve to manipulate JSON objects.

To see how these helper functions were written, refer to the definitions within the `_utils/response` folder. If there are any bugs, please let me know asap!

### getQueries(request)
getQueries is a helper function that I made to take request queries like `http://localhost:3000/api/trainers?<queries>` and converts them into a JSON object. This allows you to directly feed the query into some of mongoDB's query inputs.

### isBodyEmpty(obj: Object)
Just a simple way to check if a JSON object is empty `{}`. If our request body is empty, we should throw a NoContentError.

### prependAllAttributes(obj: Object, prefix, String)
prependAllAttributes takes a JSON object and renames all fields that are two levels deep by adding the prefix to their names.

Example Input: 
```json
{
   "$set": {
      "name": "austin",
      "age": 20
   },
   "$push": {
      "classes": ["physics", "chem"]
   }
}
```

Example Output where `prefix = PREFIX`:
```json
{
   "$set": {
      "PREFIXname": "austin",
      "PREFIXage": 20
   },
   "$push": {
      "PREFIXclasses": ["physics", "chem"]
   }
}
```

This function is mainly used when you have embeddings, such as pokemon embedded within a trainer object. When you update a pokemon from the pokemon collection, you also have to update all copies of that pokemon that is stored in an embedding inside trainer objects. In order to access subdocuments within an object, you often have to refer to fields with `dot .` notation or `array []` notation as prefixes to the actual field name.

### parseAndReplace(obj: Object)
This function recursively searches through a JSON object for certain keywords: "*convertIds", "*convertId", "*expandIds", "*expandId". **Note**: remember to add in the `*` or else the function won't recognize the keywords. After finding objects with one of these keywords as fields, it will replace the entire object with the return value of a specified operation.

Example full input:
```JSON
{
   "name": "ash",
   "age": 20,
   "pokemon": {
      "*expandIds": {
        "ids": ["65915e9052657d4814a173c4", "65915e9f52657d4814a173c7"],
        "from": "pokemon"
      }
   }
}
```

Example output:
```JSON
{
   "name": "ash",
   "age": 20,
   "pokemon": [
       {
           "_id": "65915e9052657d4814a173c4",
           "name": "vaporeon",
           "happiness": 100
       },
       {
           "_id": "65915e9f52657d4814a173c7",
           "name": "squirtle",
           "happiness": 100
       }
   ]
}
```

Before the API call is made, by calling parseAndReplace() on the incoming object, we could first convert the raw ObjectIds into pokemon documents to pass into our trainer object. If we didn't do this, the best we could input to our trainer creation command would be the raw ids.

***convertIds**:  
convertIds takes in a list of raw ObjectId strings and typecasts them into ObjectIds. This is useful since the caller of the api can only pass in ObjectIds as strings, but they need to be casted to ObjecctIds. Rather than manually defining these typeCasts within each serverless function, we can define the typeCasting within the API call itself.

Everytime an object appears like so, it will be replaced with a list of ObjectIds.  
Before:
```JSON
{
   "*convertIds": {
     "ids": ["658f94018dac260ae7b17fce", "658f940e8dac260ae7b17fd0"],
   }
}
```
After:
```js
[ObjectId("658f94018dac260ae7b17fce"), ObjectId("658f940e8dac260ae7b17fd0")]
```

There is also ***convertId**   
Before:
```json
{
   "*convertId": {
     "id": "658f94018dac260ae7b17fce",
   }
}
```  
After:
```js
ObjectId("658f94018dac260ae7b17fce")
```

***expandIds**:  
expandIds takes in a list of raw ObjectId strings and transforms it into a list of documents queried from a collection. This is extremely useful when you have embeddings. Let's say you are trying to create a trainer and want to assign it some pokemon. You plan on embedding the pokemon data within the trainer. Unless you have access to the entire pokemon objects, you (as the user) would have to first query the pokemon and then pass them into the call to create a trainer. Instead, you can just write that logic with this simple JSON object here to make the API call simpler for the user.  
Before:
```JSON
{
   "*expandIds": {
     "ids": ["65915e9052657d4814a173c4", "65915e9f52657d4814a173c7"],
     "from": "pokemon"
   }
}
```
After:
```js
[
    {
        "_id": "65915e9052657d4814a173c4",
        "name": "vaporeon",
        "happiness": 100
    },
    {
        "_id": "65915e9f52657d4814a173c7",
        "name": "squirtle",
        "happiness": 100
    }
]
```

There is also ***expandId**   
Before:
```JSON
{
   "*expandId": {
     "id": "65915e9052657d4814a173c4",
     "from": "pokemon"
   }
}
```
After:
```js
 {
     "_id": "65915e9052657d4814a173c4",
     "name": "vaporeon",
     "happiness": 100
 }
```
