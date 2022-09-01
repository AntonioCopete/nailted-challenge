
# 👩‍💻 Nailted Challenge

Development of an API Rest and UI to consume data from employees stored in a .txt file using Typescript and Node.js



## 🧠 Description
I'm going to explain some details about how I developed the project.

### Priorities
- Fast queries: I tried to priorize fast DB data queries, reading or writing in the text file before parsing the data to JSON or I would need to iterate every element to parse the data and filter it after.

- Time management: In order to have enough time to work in the app logic I decided to build the UI faster, using a framework for css (Bootstrap) and a component library (React-Bootstrap).

- Data security: I used a validation middleware in the API for employee data coming from client in the endpoint for create a new employee. For example excluding "," in any field, since commas allow us to identify different employee properties

### Endpoints
#### Get employees
```bash
GET / localhost:4000/api/v1/employees?page={page}&sort={sort}&filter={filter}
```
- page: page number to show
- sort: "name" or "surname" values will sort employees by name or surname in ascending order
- filter: string value to filter employees by e-mail

#### Get employee by id
```bash
GET / localhost:4000/api/v1/employees/{employeeId}
```

#### Create employee
```bash
POST / localhost:4000/api/v1/employees
```
- The request body contains the next employee properties: name, surname, address, email, birth(date) and phone




## ⚡️ Installation
- Need Node.js and NPM

Clone the repository.

```bash
git clone https://github.com/AntonioCopete/nailted-challenge.git <folder-name>/.

```


Execute the next commands in "backend" folder to install the backend libraries used in this project and run the API server: 

-  ``` npm install ```

-  ``` npm run dev ```


Execute the next commands in "frontend" folder to install the frontend libraries used in this project and run the client server: 

-  ``` npm install ```

-  ``` npm start ```


You can interact with the app using your web browser (http://localhost:3000/)




## 🛠 Teck stack
- HTML5
- CSS
- Bootstrap
- React-Bootstrap
- React.js
- Node.js


## 💬 Author

- [@AntonioCopete](https://www.github.com/AntonioCopete)

