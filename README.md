1. Student CRUD API using Express.js & MongoDB (Native Driver)

  This is a simple Node.js REST API project to manage student records using **Express.js** and **MongoDB without Mongoose**. It includes full CRUD (Create, Read, Update, Delete) operations with checks to prevent duplicate **emails** and **roll numbers**.



2. Features

  * Create student with email & roll number validation
  * Fetch all or one student by ID
  * Update student details by ID
  * Delete a student by ID
  * Uses native MongoDB driver (no Mongoose)
  * Easy for beginners to understand and extend



3. Installation & Setup

  a. Clone the Project


    git clone https://github.com/pandeyhimal/Student-CRUD.git
    cd Student-CRUD


  b. Install Dependencies


            npm init -y
            npm install express mongodb dotenv
            npm install --save-dev nodemon


  c. Create `.env` file


    MONGO_URI=mongodb://localhost:27017
    PORT=5000




4. Run the App

  a. Using Nodemon (Recommended for development)


    npm run dev


  b. Add to `package.json` scripts:

    
    "scripts": {
      "start": "node server.js",
      "dev": "nodemon server.js"
    }



5. Project Structure (Simplified)


  student-crud-app/
  ├── server.js        # Main file with Express routes and logic
  ├── db.js            # MongoDB connection and unique index setup
  ├── .env             # Environment config
  └── package.json




6. How CRUD API Works

  a. Create Student (POST /students)

    * Accepts JSON input (name, rollNo, faculty, semester, email)
    * Checks if email or rollNo already exists
    * If valid, inserts student into MongoDB

  b. Read All Students (GET /students)

    * Returns a list of all students in the database

  c.  Read Single Student (GET /students/\:id)

    * Fetches student by MongoDB `_id`
    * Validates ID format

  d. Update Student (PUT /students/\:id)

    * Updates any field(s) of a student by ID
    * Requires valid `_id`

  e.  Delete Student (DELETE /students/\:id)

    * Deletes a student by ID from the collection



7. Sample JSON for Creating Student


  {
    "name": "Himal pandey",
    "rollNo": 34,
    "faculty": "BICTE",
    "semester": "6th",
    "email": "himal@gmail.com"
  }




8. Notes

  * Duplicate `email` or `rollNo` returns a 400 error
  * Invalid ObjectId in any route returns a helpful message
  * Data is stored in `studentDB > students` collection in MongoDB



9. Want to Improve or Extend?

  * Add frontend form
  * Add search & filter options
  * Add file upload with Multer
  * Add pagination or authentication

Feel free to fork, use, or build on top of it!
